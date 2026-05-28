const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LoginView-CIQC78Eu.js","assets/logo-CxXS7KxG.js","assets/useToast-BMhTN4uK.js","assets/DashboardView-Aozrb32k.js","assets/useGuru-2spJP9Gn.js","assets/useLembaga-xq3zMvUn.js","assets/format-hvvLOU_z.js","assets/hijri-BQdwk8_X.js","assets/_plugin-vue_export-helper-DlAUqK2U.js","assets/useMenus-DabJvj9s.js","assets/DashboardView-CsugeZA2.css","assets/PengaturanView-BT2U2_bE.js","assets/useConfirm-D6dgU-7B.js","assets/storage-BWUMgEma.js","assets/UiButton-Dti_PtJJ.js","assets/ProfilView-CJHAeSyS.js","assets/SantriView-D6jqTAL_.js","assets/useSantri-bKKofibV.js","assets/santriSort-DP3NNiLp.js","assets/useExcel-CfMuM0d2.js","assets/pdfBuilder-UgG-fR_z.js","assets/pdf-CfElz_X6.js","assets/GuruView-0JzVQkF3.js","assets/KelasView-ByHr-1ml.js","assets/FieldSchemaView-DR0rTnxP.js","assets/MasterFormBridgeView-DokLwU_z.js","assets/KeuanganDashboardView-BB2e2OyU.js","assets/useKeuangan-Nmp8E6_1.js","assets/TagihanView-BJeP72gv.js","assets/roleScope-CQVrCNMB.js","assets/auditLog-CTDHWP3F.js","assets/TabunganView-SfoSKMF6.js","assets/BisyarohView-BSZCnSIW.js","assets/KritikSaranView-CA6Qnbbg.js","assets/AbsensiGuruView-DK430trX.js","assets/SantriFormView-DLlsY1nN.js","assets/GuruFormView-BeGuyFb8.js","assets/LembagaFormView-BhKSVL2H.js","assets/LembagaDetailView-Cfys39WO.js","assets/UiActionCard-DYnqPRRT.js","assets/AbsensiSantriView-DT97nl0O.js","assets/PostsView-DqQcj5TC.js","assets/PostsView-DyvXEcbs.css","assets/BukuIndukView-Buwsw-LM.js","assets/strukBuilder-DSGagWgm.js","assets/LaporanKeuanganView-CLdkotM8.js","assets/PpdbAdminView-DGwMpqPP.js","assets/PpdbDetailView-BXR6ffnB.js","assets/PosSantriView-jDylVt67.js","assets/PosSantriView-D0BGwg6s.css","assets/RiwayatPosView-Cmg8BDbt.js","assets/RiwayatSantriView-Cwl9llEF.js","assets/NaikKelasView-DbrFNKIS.js","assets/NaikKelasView-CQwp6oOD.css","assets/KalenderKegiatanView-DNwkWpra.js","assets/StatistikView-BtTHAwln.js","assets/InputBulananView-C2orArJL.js","assets/InputBulananView-BPfVFNv0.css","assets/RekapPrestasiView-Bn40M-Ak.js","assets/RekapDiniyahView-Bsv5dH9P.js","assets/RaporView-ebgNNcea.js","assets/RaporView-R-PyClAg.css","assets/PengaturanKeuanganView-XPJEgFTQ.js","assets/MasterDataView-mEc6XYQ8.js","assets/KegiatanPesantrenView-FNGZkDJQ.js","assets/HutangPiutangView-C0coPxpv.js","assets/PembayaranView-DAL2FbgG.js","assets/CapaianPrestasiView-BfvFrH7C.js","assets/PersonalView-rD3USgCo.js","assets/AppLayout-R162XNxp.js","assets/AppLayout-DnqScTxq.css"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Cb="modulepreload",Db=function(n){return"/"+n},Hm={},ge=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){let o=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(l=>{if(l=Db(l),l in Hm)return;Hm[l]=!0;const h=l.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${f}`))return;const m=document.createElement("link");if(m.rel=h?"stylesheet":Cb,h||(m.as="script"),m.crossOrigin="",m.href=l,c&&m.setAttribute("nonce",c),document.head.appendChild(m),h)return new Promise((g,b)=>{m.addEventListener("load",g),m.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Zd(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const Ue={},Os=[],$n=()=>{},rI=()=>!1,tl=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),nl=n=>n.startsWith("onUpdate:"),It=Object.assign,ef=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},kb=Object.prototype.hasOwnProperty,Ne=(n,e)=>kb.call(n,e),le=Array.isArray,xs=n=>rc(n)==="[object Map]",lo=n=>rc(n)==="[object Set]",Wm=n=>rc(n)==="[object Date]",_e=n=>typeof n=="function",$e=n=>typeof n=="string",pn=n=>typeof n=="symbol",Ve=n=>n!==null&&typeof n=="object",iI=n=>(Ve(n)||_e(n))&&_e(n.then)&&_e(n.catch),sI=Object.prototype.toString,rc=n=>sI.call(n),Nb=n=>rc(n).slice(8,-1),oI=n=>rc(n)==="[object Object]",rl=n=>$e(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,da=Zd(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),il=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},Vb=/-\w/g,Jt=il(n=>n.replace(Vb,e=>e.slice(1).toUpperCase())),Ob=/\B([A-Z])/g,_i=il(n=>n.replace(Ob,"-$1").toLowerCase()),sl=il(n=>n.charAt(0).toUpperCase()+n.slice(1)),Ih=il(n=>n?`on${sl(n)}`:""),Fn=(n,e)=>!Object.is(n,e),ou=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},aI=(n,e,t,r=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:r,value:t})},ol=n=>{const e=parseFloat(n);return isNaN(e)?n:e},xb=n=>{const e=$e(n)?Number(n):NaN;return isNaN(e)?n:e};let Qm;const al=()=>Qm||(Qm=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function tf(n){if(le(n)){const e={};for(let t=0;t<n.length;t++){const r=n[t],i=$e(r)?Ub(r):tf(r);if(i)for(const s in i)e[s]=i[s]}return e}else if($e(n)||Ve(n))return n}const Lb=/;(?![^(]*\))/g,Mb=/:([^]+)/,Fb=/\/\*[^]*?\*\//g;function Ub(n){const e={};return n.replace(Fb,"").split(Lb).forEach(t=>{if(t){const r=t.split(Mb);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function nf(n){let e="";if($e(n))e=n;else if(le(n))for(let t=0;t<n.length;t++){const r=nf(n[t]);r&&(e+=r+" ")}else if(Ve(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Bb="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",qb=Zd(Bb);function cI(n){return!!n||n===""}function jb(n,e){if(n.length!==e.length)return!1;let t=!0;for(let r=0;t&&r<n.length;r++)t=ri(n[r],e[r]);return t}function ri(n,e){if(n===e)return!0;let t=Wm(n),r=Wm(e);if(t||r)return t&&r?n.getTime()===e.getTime():!1;if(t=pn(n),r=pn(e),t||r)return n===e;if(t=le(n),r=le(e),t||r)return t&&r?jb(n,e):!1;if(t=Ve(n),r=Ve(e),t||r){if(!t||!r)return!1;const i=Object.keys(n).length,s=Object.keys(e).length;if(i!==s)return!1;for(const o in n){const a=n.hasOwnProperty(o),c=e.hasOwnProperty(o);if(a&&!c||!a&&c||!ri(n[o],e[o]))return!1}}return String(n)===String(e)}function rf(n,e){return n.findIndex(t=>ri(t,e))}const uI=n=>!!(n&&n.__v_isRef===!0),Gb=n=>$e(n)?n:n==null?"":le(n)||Ve(n)&&(n.toString===sI||!_e(n.toString))?uI(n)?Gb(n.value):JSON.stringify(n,lI,2):String(n),lI=(n,e)=>uI(e)?lI(n,e.value):xs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[r,i],s)=>(t[vh(r,s)+" =>"]=i,t),{})}:lo(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>vh(t))}:pn(e)?vh(e):Ve(e)&&!le(e)&&!oI(e)?String(e):e,vh=(n,e="")=>{var t;return pn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let yt;class hI{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&yt&&(yt.active?(this.parent=yt,this.index=(yt.scopes||(yt.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=yt;try{return yt=this,e()}finally{yt=t}}}on(){++this._on===1&&(this.prevScope=yt,yt=this)}off(){if(this._on>0&&--this._on===0){if(yt===this)yt=this.prevScope;else{let e=yt;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(this.effects.length=0,t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function dI(n){return new hI(n)}function fI(){return yt}function Kb(n,e=!1){yt&&yt.cleanups.push(n)}let Be;const Eh=new WeakSet;class pI{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,yt&&(yt.active?yt.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Eh.has(this)&&(Eh.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||gI(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Jm(this),_I(this);const e=Be,t=Pn;Be=this,Pn=!0;try{return this.fn()}finally{yI(this),Be=e,Pn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)af(e);this.deps=this.depsTail=void 0,Jm(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Eh.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){rd(this)&&this.run()}get dirty(){return rd(this)}}let mI=0,fa,pa;function gI(n,e=!1){if(n.flags|=8,e){n.next=pa,pa=n;return}n.next=fa,fa=n}function sf(){mI++}function of(){if(--mI>0)return;if(pa){let e=pa;for(pa=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;fa;){let e=fa;for(fa=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){n||(n=r)}e=t}}if(n)throw n}function _I(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function yI(n){let e,t=n.depsTail,r=t;for(;r;){const i=r.prevDep;r.version===-1?(r===t&&(t=i),af(r),$b(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=i}n.deps=e,n.depsTail=t}function rd(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(II(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function II(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Ca)||(n.globalVersion=Ca,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!rd(n))))return;n.flags|=2;const e=n.dep,t=Be,r=Pn;Be=n,Pn=!0;try{_I(n);const i=n.fn(n._value);(e.version===0||Fn(i,n._value))&&(n.flags|=128,n._value=i,e.version++)}catch(i){throw e.version++,i}finally{Be=t,Pn=r,yI(n),n.flags&=-3}}function af(n,e=!1){const{dep:t,prevSub:r,nextSub:i}=n;if(r&&(r.nextSub=i,n.prevSub=void 0),i&&(i.prevSub=r,n.nextSub=void 0),t.subs===n&&(t.subs=r,!r&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)af(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function $b(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Pn=!0;const vI=[];function yr(){vI.push(Pn),Pn=!1}function Ir(){const n=vI.pop();Pn=n===void 0?!0:n}function Jm(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Be;Be=void 0;try{e()}finally{Be=t}}}let Ca=0;class zb{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class cf{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Be||!Pn||Be===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Be)t=this.activeLink=new zb(Be,this),Be.deps?(t.prevDep=Be.depsTail,Be.depsTail.nextDep=t,Be.depsTail=t):Be.deps=Be.depsTail=t,EI(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const r=t.nextDep;r.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=r),t.prevDep=Be.depsTail,t.nextDep=void 0,Be.depsTail.nextDep=t,Be.depsTail=t,Be.deps===t&&(Be.deps=r)}return t}trigger(e){this.version++,Ca++,this.notify(e)}notify(e){sf();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{of()}}}function EI(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)EI(r)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Tu=new WeakMap,zi=Symbol(""),id=Symbol(""),Da=Symbol("");function Ft(n,e,t){if(Pn&&Be){let r=Tu.get(n);r||Tu.set(n,r=new Map);let i=r.get(t);i||(r.set(t,i=new cf),i.map=r,i.key=t),i.track()}}function sr(n,e,t,r,i,s){const o=Tu.get(n);if(!o){Ca++;return}const a=c=>{c&&c.trigger()};if(sf(),e==="clear")o.forEach(a);else{const c=le(n),l=c&&rl(t);if(c&&t==="length"){const h=Number(r);o.forEach((f,m)=>{(m==="length"||m===Da||!pn(m)&&m>=h)&&a(f)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),l&&a(o.get(Da)),e){case"add":c?l&&a(o.get("length")):(a(o.get(zi)),xs(n)&&a(o.get(id)));break;case"delete":c||(a(o.get(zi)),xs(n)&&a(o.get(id)));break;case"set":xs(n)&&a(o.get(zi));break}}of()}function Hb(n,e){const t=Tu.get(n);return t&&t.get(e)}function vs(n){const e=Pe(n);return e===n?e:(Ft(e,"iterate",Da),dn(n)?e:e.map(Dn))}function cl(n){return Ft(n=Pe(n),"iterate",Da),n}function Ln(n,e){return vr(n)?Ks(gr(n)?Dn(e):e):Dn(e)}const Wb={__proto__:null,[Symbol.iterator](){return Th(this,Symbol.iterator,n=>Ln(this,n))},concat(...n){return vs(this).concat(...n.map(e=>le(e)?vs(e):e))},entries(){return Th(this,"entries",n=>(n[1]=Ln(this,n[1]),n))},every(n,e){return er(this,"every",n,e,void 0,arguments)},filter(n,e){return er(this,"filter",n,e,t=>t.map(r=>Ln(this,r)),arguments)},find(n,e){return er(this,"find",n,e,t=>Ln(this,t),arguments)},findIndex(n,e){return er(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return er(this,"findLast",n,e,t=>Ln(this,t),arguments)},findLastIndex(n,e){return er(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return er(this,"forEach",n,e,void 0,arguments)},includes(...n){return wh(this,"includes",n)},indexOf(...n){return wh(this,"indexOf",n)},join(n){return vs(this).join(n)},lastIndexOf(...n){return wh(this,"lastIndexOf",n)},map(n,e){return er(this,"map",n,e,void 0,arguments)},pop(){return Go(this,"pop")},push(...n){return Go(this,"push",n)},reduce(n,...e){return Ym(this,"reduce",n,e)},reduceRight(n,...e){return Ym(this,"reduceRight",n,e)},shift(){return Go(this,"shift")},some(n,e){return er(this,"some",n,e,void 0,arguments)},splice(...n){return Go(this,"splice",n)},toReversed(){return vs(this).toReversed()},toSorted(n){return vs(this).toSorted(n)},toSpliced(...n){return vs(this).toSpliced(...n)},unshift(...n){return Go(this,"unshift",n)},values(){return Th(this,"values",n=>Ln(this,n))}};function Th(n,e,t){const r=cl(n),i=r[e]();return r!==n&&!dn(n)&&(i._next=i.next,i.next=()=>{const s=i._next();return s.done||(s.value=t(s.value)),s}),i}const Qb=Array.prototype;function er(n,e,t,r,i,s){const o=cl(n),a=o!==n&&!dn(n),c=o[e];if(c!==Qb[e]){const f=c.apply(n,s);return a?Dn(f):f}let l=t;o!==n&&(a?l=function(f,m){return t.call(this,Ln(n,f),m,n)}:t.length>2&&(l=function(f,m){return t.call(this,f,m,n)}));const h=c.call(o,l,r);return a&&i?i(h):h}function Ym(n,e,t,r){const i=cl(n),s=i!==n&&!dn(n);let o=t,a=!1;i!==n&&(s?(a=r.length===0,o=function(l,h,f){return a&&(a=!1,l=Ln(n,l)),t.call(this,l,Ln(n,h),f,n)}):t.length>3&&(o=function(l,h,f){return t.call(this,l,h,f,n)}));const c=i[e](o,...r);return a?Ln(n,c):c}function wh(n,e,t){const r=Pe(n);Ft(r,"iterate",Da);const i=r[e](...t);return(i===-1||i===!1)&&ul(t[0])?(t[0]=Pe(t[0]),r[e](...t)):i}function Go(n,e,t=[]){yr(),sf();const r=Pe(n)[e].apply(n,t);return of(),Ir(),r}const Jb=Zd("__proto__,__v_isRef,__isVue"),TI=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(pn));function Yb(n){pn(n)||(n=String(n));const e=Pe(this);return Ft(e,"has",n),e.hasOwnProperty(n)}class wI{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,r){if(t==="__v_skip")return e.__v_skip;const i=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!i;if(t==="__v_isReadonly")return i;if(t==="__v_isShallow")return s;if(t==="__v_raw")return r===(i?s?aR:SI:s?RI:bI).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=le(e);if(!i){let c;if(o&&(c=Wb[t]))return c;if(t==="hasOwnProperty")return Yb}const a=Reflect.get(e,t,it(e)?e:r);if((pn(t)?TI.has(t):Jb(t))||(i||Ft(e,"get",t),s))return a;if(it(a)){const c=o&&rl(t)?a:a.value;return i&&Ve(c)?od(c):c}return Ve(a)?i?od(a):ic(a):a}}class AI extends wI{constructor(e=!1){super(!1,e)}set(e,t,r,i){let s=e[t];const o=le(e)&&rl(t);if(!this._isShallow){const l=vr(s);if(!dn(r)&&!vr(r)&&(s=Pe(s),r=Pe(r)),!o&&it(s)&&!it(r))return l||(s.value=r),!0}const a=o?Number(t)<e.length:Ne(e,t),c=Reflect.set(e,t,r,it(e)?e:i);return e===Pe(i)&&(a?Fn(r,s)&&sr(e,"set",t,r):sr(e,"add",t,r)),c}deleteProperty(e,t){const r=Ne(e,t);e[t];const i=Reflect.deleteProperty(e,t);return i&&r&&sr(e,"delete",t,void 0),i}has(e,t){const r=Reflect.has(e,t);return(!pn(t)||!TI.has(t))&&Ft(e,"has",t),r}ownKeys(e){return Ft(e,"iterate",le(e)?"length":zi),Reflect.ownKeys(e)}}class Xb extends wI{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Zb=new AI,eR=new Xb,tR=new AI(!0);const sd=n=>n,Kc=n=>Reflect.getPrototypeOf(n);function nR(n,e,t){return function(...r){const i=this.__v_raw,s=Pe(i),o=xs(s),a=n==="entries"||n===Symbol.iterator&&o,c=n==="keys"&&o,l=i[n](...r),h=t?sd:e?Ks:Dn;return!e&&Ft(s,"iterate",c?id:zi),It(Object.create(l),{next(){const{value:f,done:m}=l.next();return m?{value:f,done:m}:{value:a?[h(f[0]),h(f[1])]:h(f),done:m}}})}}function $c(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function rR(n,e){const t={get(i){const s=this.__v_raw,o=Pe(s),a=Pe(i);n||(Fn(i,a)&&Ft(o,"get",i),Ft(o,"get",a));const{has:c}=Kc(o),l=e?sd:n?Ks:Dn;if(c.call(o,i))return l(s.get(i));if(c.call(o,a))return l(s.get(a));s!==o&&s.get(i)},get size(){const i=this.__v_raw;return!n&&Ft(Pe(i),"iterate",zi),i.size},has(i){const s=this.__v_raw,o=Pe(s),a=Pe(i);return n||(Fn(i,a)&&Ft(o,"has",i),Ft(o,"has",a)),i===a?s.has(i):s.has(i)||s.has(a)},forEach(i,s){const o=this,a=o.__v_raw,c=Pe(a),l=e?sd:n?Ks:Dn;return!n&&Ft(c,"iterate",zi),a.forEach((h,f)=>i.call(s,l(h),l(f),o))}};return It(t,n?{add:$c("add"),set:$c("set"),delete:$c("delete"),clear:$c("clear")}:{add(i){const s=Pe(this),o=Kc(s),a=Pe(i),c=!e&&!dn(i)&&!vr(i)?a:i;return o.has.call(s,c)||Fn(i,c)&&o.has.call(s,i)||Fn(a,c)&&o.has.call(s,a)||(s.add(c),sr(s,"add",c,c)),this},set(i,s){!e&&!dn(s)&&!vr(s)&&(s=Pe(s));const o=Pe(this),{has:a,get:c}=Kc(o);let l=a.call(o,i);l||(i=Pe(i),l=a.call(o,i));const h=c.call(o,i);return o.set(i,s),l?Fn(s,h)&&sr(o,"set",i,s):sr(o,"add",i,s),this},delete(i){const s=Pe(this),{has:o,get:a}=Kc(s);let c=o.call(s,i);c||(i=Pe(i),c=o.call(s,i)),a&&a.call(s,i);const l=s.delete(i);return c&&sr(s,"delete",i,void 0),l},clear(){const i=Pe(this),s=i.size!==0,o=i.clear();return s&&sr(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=nR(i,n,e)}),t}function uf(n,e){const t=rR(n,e);return(r,i,s)=>i==="__v_isReactive"?!n:i==="__v_isReadonly"?n:i==="__v_raw"?r:Reflect.get(Ne(t,i)&&i in r?t:r,i,s)}const iR={get:uf(!1,!1)},sR={get:uf(!1,!0)},oR={get:uf(!0,!1)};const bI=new WeakMap,RI=new WeakMap,SI=new WeakMap,aR=new WeakMap;function cR(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function uR(n){return n.__v_skip||!Object.isExtensible(n)?0:cR(Nb(n))}function ic(n){return vr(n)?n:lf(n,!1,Zb,iR,bI)}function PI(n){return lf(n,!1,tR,sR,RI)}function od(n){return lf(n,!0,eR,oR,SI)}function lf(n,e,t,r,i){if(!Ve(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=uR(n);if(s===0)return n;const o=i.get(n);if(o)return o;const a=new Proxy(n,s===2?r:t);return i.set(n,a),a}function gr(n){return vr(n)?gr(n.__v_raw):!!(n&&n.__v_isReactive)}function vr(n){return!!(n&&n.__v_isReadonly)}function dn(n){return!!(n&&n.__v_isShallow)}function ul(n){return n?!!n.__v_raw:!1}function Pe(n){const e=n&&n.__v_raw;return e?Pe(e):n}function hf(n){return!Ne(n,"__v_skip")&&Object.isExtensible(n)&&aI(n,"__v_skip",!0),n}const Dn=n=>Ve(n)?ic(n):n,Ks=n=>Ve(n)?od(n):n;function it(n){return n?n.__v_isRef===!0:!1}function un(n){return CI(n,!1)}function lR(n){return CI(n,!0)}function CI(n,e){return it(n)?n:new hR(n,e)}class hR{constructor(e,t){this.dep=new cf,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Pe(e),this._value=t?e:Dn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,r=this.__v_isShallow||dn(e)||vr(e);e=r?e:Pe(e),Fn(e,t)&&(this._rawValue=e,this._value=r?e:Dn(e),this.dep.trigger())}}function Hi(n){return it(n)?n.value:n}const dR={get:(n,e,t)=>e==="__v_raw"?n:Hi(Reflect.get(n,e,t)),set:(n,e,t,r)=>{const i=n[e];return it(i)&&!it(t)?(i.value=t,!0):Reflect.set(n,e,t,r)}};function DI(n){return gr(n)?n:new Proxy(n,dR)}function fR(n){const e=le(n)?new Array(n.length):{};for(const t in n)e[t]=mR(n,t);return e}class pR{constructor(e,t,r){this._object=e,this._defaultValue=r,this.__v_isRef=!0,this._value=void 0,this._key=pn(t)?t:String(t),this._raw=Pe(e);let i=!0,s=e;if(!le(e)||pn(this._key)||!rl(this._key))do i=!ul(s)||dn(s);while(i&&(s=s.__v_raw));this._shallow=i}get value(){let e=this._object[this._key];return this._shallow&&(e=Hi(e)),this._value=e===void 0?this._defaultValue:e}set value(e){if(this._shallow&&it(this._raw[this._key])){const t=this._object[this._key];if(it(t)){t.value=e;return}}this._object[this._key]=e}get dep(){return Hb(this._raw,this._key)}}function mR(n,e,t){return new pR(n,e,t)}class gR{constructor(e,t,r){this.fn=e,this.setter=t,this._value=void 0,this.dep=new cf(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ca-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Be!==this)return gI(this,!0),!0}get value(){const e=this.dep.track();return II(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function _R(n,e,t=!1){let r,i;return _e(n)?r=n:(r=n.get,i=n.set),new gR(r,i,t)}const zc={},wu=new WeakMap;let xi;function yR(n,e=!1,t=xi){if(t){let r=wu.get(t);r||wu.set(t,r=[]),r.push(n)}}function IR(n,e,t=Ue){const{immediate:r,deep:i,once:s,scheduler:o,augmentJob:a,call:c}=t,l=M=>i?M:dn(M)||i===!1||i===0?or(M,1):or(M);let h,f,m,g,b=!1,R=!1;if(it(n)?(f=()=>n.value,b=dn(n)):gr(n)?(f=()=>l(n),b=!0):le(n)?(R=!0,b=n.some(M=>gr(M)||dn(M)),f=()=>n.map(M=>{if(it(M))return M.value;if(gr(M))return l(M);if(_e(M))return c?c(M,2):M()})):_e(n)?e?f=c?()=>c(n,2):n:f=()=>{if(m){yr();try{m()}finally{Ir()}}const M=xi;xi=h;try{return c?c(n,3,[g]):n(g)}finally{xi=M}}:f=$n,e&&i){const M=f,H=i===!0?1/0:i;f=()=>or(M(),H)}const C=fI(),V=()=>{h.stop(),C&&C.active&&ef(C.effects,h)};if(s&&e){const M=e;e=(...H)=>{M(...H),V()}}let D=R?new Array(n.length).fill(zc):zc;const x=M=>{if(!(!(h.flags&1)||!h.dirty&&!M))if(e){const H=h.run();if(i||b||(R?H.some((j,E)=>Fn(j,D[E])):Fn(H,D))){m&&m();const j=xi;xi=h;try{const E=[H,D===zc?void 0:R&&D[0]===zc?[]:D,g];D=H,c?c(e,3,E):e(...E)}finally{xi=j}}}else h.run()};return a&&a(x),h=new pI(f),h.scheduler=o?()=>o(x,!1):x,g=M=>yR(M,!1,h),m=h.onStop=()=>{const M=wu.get(h);if(M){if(c)c(M,4);else for(const H of M)H();wu.delete(h)}},e?r?x(!0):D=h.run():o?o(x.bind(null,!0),!0):h.run(),V.pause=h.pause.bind(h),V.resume=h.resume.bind(h),V.stop=V,V}function or(n,e=1/0,t){if(e<=0||!Ve(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,it(n))or(n.value,e,t);else if(le(n))for(let r=0;r<n.length;r++)or(n[r],e,t);else if(lo(n)||xs(n))n.forEach(r=>{or(r,e,t)});else if(oI(n)){for(const r in n)or(n[r],e,t);for(const r of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,r)&&or(n[r],e,t)}return n}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function sc(n,e,t,r){try{return r?n(...r):n()}catch(i){ll(i,e,t)}}function kn(n,e,t,r){if(_e(n)){const i=sc(n,e,t,r);return i&&iI(i)&&i.catch(s=>{ll(s,e,t)}),i}if(le(n)){const i=[];for(let s=0;s<n.length;s++)i.push(kn(n[s],e,t,r));return i}}function ll(n,e,t,r=!0){const i=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Ue;if(e){let a=e.parent;const c=e.proxy,l=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const h=a.ec;if(h){for(let f=0;f<h.length;f++)if(h[f](n,c,l)===!1)return}a=a.parent}if(s){yr(),sc(s,null,10,[n,c,l]),Ir();return}}vR(n,t,i,r,o)}function vR(n,e,t,r=!0,i=!1){if(i)throw n;console.error(n)}const Qt=[];let On=-1;const Ls=[];let zr=null,Ps=0;const kI=Promise.resolve();let Au=null;function hl(n){const e=Au||kI;return n?e.then(this?n.bind(this):n):e}function ER(n){let e=On+1,t=Qt.length;for(;e<t;){const r=e+t>>>1,i=Qt[r],s=ka(i);s<n||s===n&&i.flags&2?e=r+1:t=r}return e}function df(n){if(!(n.flags&1)){const e=ka(n),t=Qt[Qt.length-1];!t||!(n.flags&2)&&e>=ka(t)?Qt.push(n):Qt.splice(ER(e),0,n),n.flags|=1,NI()}}function NI(){Au||(Au=kI.then(OI))}function TR(n){le(n)?Ls.push(...n):zr&&n.id===-1?zr.splice(Ps+1,0,n):n.flags&1||(Ls.push(n),n.flags|=1),NI()}function Xm(n,e,t=On+1){for(;t<Qt.length;t++){const r=Qt[t];if(r&&r.flags&2){if(n&&r.id!==n.uid)continue;Qt.splice(t,1),t--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function VI(n){if(Ls.length){const e=[...new Set(Ls)].sort((t,r)=>ka(t)-ka(r));if(Ls.length=0,zr){zr.push(...e);return}for(zr=e,Ps=0;Ps<zr.length;Ps++){const t=zr[Ps];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}zr=null,Ps=0}}const ka=n=>n.id==null?n.flags&2?-1:1/0:n.id;function OI(n){try{for(On=0;On<Qt.length;On++){const e=Qt[On];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),sc(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;On<Qt.length;On++){const e=Qt[On];e&&(e.flags&=-2)}On=-1,Qt.length=0,VI(),Au=null,(Qt.length||Ls.length)&&OI()}}let Nt=null,xI=null;function bu(n){const e=Nt;return Nt=n,xI=n&&n.type.__scopeId||null,e}function ad(n,e=Nt,t){if(!e||n._n)return n;const r=(...i)=>{r._d&&Pu(-1);const s=bu(e);let o;try{o=n(...i)}finally{bu(s),r._d&&Pu(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function IU(n,e){if(Nt===null)return n;const t=gl(Nt),r=n.dirs||(n.dirs=[]);for(let i=0;i<e.length;i++){let[s,o,a,c=Ue]=e[i];s&&(_e(s)&&(s={mounted:s,updated:s}),s.deep&&or(o),r.push({dir:s,instance:t,value:o,oldValue:void 0,arg:a,modifiers:c}))}return n}function Di(n,e,t,r){const i=n.dirs,s=e&&e.dirs;for(let o=0;o<i.length;o++){const a=i[o];s&&(a.oldValue=s[o].value);let c=a.dir[r];c&&(yr(),kn(c,t,8,[n.el,a,n,e]),Ir())}}function au(n,e){if(Bt){let t=Bt.provides;const r=Bt.parent&&Bt.parent.provides;r===t&&(t=Bt.provides=Object.create(r)),t[n]=e}}function Tn(n,e,t=!1){const r=yf();if(r||Wi){let i=Wi?Wi._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&n in i)return i[n];if(arguments.length>1)return t&&_e(e)?e.call(r&&r.proxy):e}}function wR(){return!!(yf()||Wi)}const AR=Symbol.for("v-scx"),bR=()=>Tn(AR);function vU(n,e){return ff(n,null,e)}function Ms(n,e,t){return ff(n,e,t)}function ff(n,e,t=Ue){const{immediate:r,deep:i,flush:s,once:o}=t,a=It({},t),c=e&&r||!e&&s!=="post";let l;if(Ma){if(s==="sync"){const g=bR();l=g.__watcherHandles||(g.__watcherHandles=[])}else if(!c){const g=()=>{};return g.stop=$n,g.resume=$n,g.pause=$n,g}}const h=Bt;a.call=(g,b,R)=>kn(g,h,b,R);let f=!1;s==="post"?a.scheduler=g=>{Ht(g,h&&h.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(g,b)=>{b?g():df(g)}),a.augmentJob=g=>{e&&(g.flags|=4),f&&(g.flags|=2,h&&(g.id=h.uid,g.i=h))};const m=IR(n,e,a);return Ma&&(l?l.push(m):c&&m()),m}function RR(n,e,t){const r=this.proxy,i=$e(n)?n.includes(".")?LI(r,n):()=>r[n]:n.bind(r,r);let s;_e(e)?s=e:(s=e.handler,t=e);const o=oc(this),a=ff(i,s.bind(r),t);return o(),a}function LI(n,e){const t=e.split(".");return()=>{let r=n;for(let i=0;i<t.length&&r;i++)r=r[t[i]];return r}}const Kr=new WeakMap,MI=Symbol("_vte"),FI=n=>n.__isTeleport,Fi=n=>n&&(n.disabled||n.disabled===""),SR=n=>n&&(n.defer||n.defer===""),Zm=n=>typeof SVGElement<"u"&&n instanceof SVGElement,eg=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,cd=(n,e)=>{const t=n&&n.to;return $e(t)?e?e(t):null:t},PR={name:"Teleport",__isTeleport:!0,process(n,e,t,r,i,s,o,a,c,l){const{mc:h,pc:f,pbc:m,o:{insert:g,querySelector:b,createText:R,createComment:C,parentNode:V}}=l,D=Fi(e.props);let{dynamicChildren:x}=e;const M=(E,_,y)=>{E.shapeFlag&16&&h(E.children,_,y,i,s,o,a,c)},H=(E=e)=>{const _=Fi(E.props),y=E.target=cd(E.props,b),v=ud(y,E,R,g);y&&(o!=="svg"&&Zm(y)?o="svg":o!=="mathml"&&eg(y)&&(o="mathml"),i&&i.isCE&&(i.ce._teleportTargets||(i.ce._teleportTargets=new Set)).add(y),_||(M(E,y,v),ta(E,!1)))},j=E=>{const _=()=>{if(Kr.get(E)===_){if(Kr.delete(E),Fi(E.props)){const y=V(E.el)||t;M(E,y,E.anchor),ta(E,!0)}H(E)}};Kr.set(E,_),Ht(_,s)};if(n==null){const E=e.el=R(""),_=e.anchor=R("");if(g(E,t,r),g(_,t,r),SR(e.props)||s&&s.pendingBranch){j(e);return}D&&(M(e,t,_),ta(e,!0)),H()}else{e.el=n.el;const E=e.anchor=n.anchor,_=Kr.get(n);if(_){_.flags|=8,Kr.delete(n),j(e);return}e.targetStart=n.targetStart;const y=e.target=n.target,v=e.targetAnchor=n.targetAnchor,P=Fi(n.props),A=P?t:y,T=P?E:v;if(o==="svg"||Zm(y)?o="svg":(o==="mathml"||eg(y))&&(o="mathml"),x?(m(n.dynamicChildren,x,A,i,s,o,a),gf(n,e,!0)):c||f(n,e,A,T,i,s,o,a,!1),D)P?e.props&&n.props&&e.props.to!==n.props.to&&(e.props.to=n.props.to):Hc(e,t,E,l,1);else if((e.props&&e.props.to)!==(n.props&&n.props.to)){const Se=e.target=cd(e.props,b);Se&&Hc(e,Se,null,l,0)}else P&&Hc(e,y,v,l,1);ta(e,D)}},remove(n,e,t,{um:r,o:{remove:i}},s){const{shapeFlag:o,children:a,anchor:c,targetStart:l,targetAnchor:h,target:f,props:m}=n;let g=s||!Fi(m);const b=Kr.get(n);if(b&&(b.flags|=8,Kr.delete(n),g=!1),f&&(i(l),i(h)),s&&i(c),o&16)for(let R=0;R<a.length;R++){const C=a[R];r(C,e,t,g,!!C.dynamicChildren)}},move:Hc,hydrate:CR};function Hc(n,e,t,{o:{insert:r},m:i},s=2){s===0&&r(n.targetAnchor,e,t);const{el:o,anchor:a,shapeFlag:c,children:l,props:h}=n,f=s===2;if(f&&r(o,e,t),!Kr.has(n)&&(!f||Fi(h))&&c&16)for(let m=0;m<l.length;m++)i(l[m],e,t,2);f&&r(a,e,t)}function CR(n,e,t,r,i,s,{o:{nextSibling:o,parentNode:a,querySelector:c,insert:l,createText:h}},f){function m(C,V){let D=V;for(;D;){if(D&&D.nodeType===8){if(D.data==="teleport start anchor")e.targetStart=D;else if(D.data==="teleport anchor"){e.targetAnchor=D,C._lpa=e.targetAnchor&&o(e.targetAnchor);break}}D=o(D)}}function g(C,V){V.anchor=f(o(C),V,a(C),t,r,i,s)}const b=e.target=cd(e.props,c),R=Fi(e.props);if(b){const C=b._lpa||b.firstChild;e.shapeFlag&16&&(R?(g(n,e),m(b,C),e.targetAnchor||ud(b,e,h,l,a(n)===b?n:null)):(e.anchor=o(n),m(b,C),e.targetAnchor||ud(b,e,h,l),f(C&&o(C),e,b,t,r,i,s))),ta(e,R)}else R&&e.shapeFlag&16&&(g(n,e),e.targetStart=n,e.targetAnchor=o(n));return e.anchor&&o(e.anchor)}const EU=PR;function ta(n,e){const t=n.ctx;if(t&&t.ut){let r,i;for(e?(r=n.el,i=n.anchor):(r=n.targetStart,i=n.targetAnchor);r&&r!==i;)r.nodeType===1&&r.setAttribute("data-v-owner",t.uid),r=r.nextSibling;t.ut()}}function ud(n,e,t,r,i=null){const s=e.targetStart=t(""),o=e.targetAnchor=t("");return s[MI]=o,n&&(r(s,n,i),r(o,n,i)),o}const xn=Symbol("_leaveCb"),Ko=Symbol("_enterCb");function DR(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return HI(()=>{n.isMounted=!0}),WI(()=>{n.isUnmounting=!0}),n}const vn=[Function,Array],UI={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:vn,onEnter:vn,onAfterEnter:vn,onEnterCancelled:vn,onBeforeLeave:vn,onLeave:vn,onAfterLeave:vn,onLeaveCancelled:vn,onBeforeAppear:vn,onAppear:vn,onAfterAppear:vn,onAppearCancelled:vn},BI=n=>{const e=n.subTree;return e.component?BI(e.component):e},kR={name:"BaseTransition",props:UI,setup(n,{slots:e}){const t=yf(),r=DR();return()=>{const i=e.default&&GI(e.default(),!0),s=i&&i.length?qI(i):t.subTree?ES():void 0;if(!s)return;const o=Pe(n),{mode:a}=o;if(r.isLeaving)return Ah(s);const c=tg(s);if(!c)return Ah(s);let l=ld(c,o,r,t,f=>l=f);c.type!==Ut&&Na(c,l);let h=t.subTree&&tg(t.subTree);if(h&&h.type!==Ut&&!Ui(h,c)&&BI(t).type!==Ut){let f=ld(h,o,r,t);if(Na(h,f),a==="out-in"&&c.type!==Ut)return r.isLeaving=!0,f.afterLeave=()=>{r.isLeaving=!1,t.job.flags&8||t.update(),delete f.afterLeave,h=void 0},Ah(s);a==="in-out"&&c.type!==Ut?f.delayLeave=(m,g,b)=>{const R=jI(r,h);R[String(h.key)]=h,m[xn]=()=>{g(),m[xn]=void 0,delete l.delayedLeave,h=void 0},l.delayedLeave=()=>{b(),delete l.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return s}}};function qI(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==Ut){e=t;break}}return e}const NR=kR;function jI(n,e){const{leavingVNodes:t}=n;let r=t.get(e.type);return r||(r=Object.create(null),t.set(e.type,r)),r}function ld(n,e,t,r,i){const{appear:s,mode:o,persisted:a=!1,onBeforeEnter:c,onEnter:l,onAfterEnter:h,onEnterCancelled:f,onBeforeLeave:m,onLeave:g,onAfterLeave:b,onLeaveCancelled:R,onBeforeAppear:C,onAppear:V,onAfterAppear:D,onAppearCancelled:x}=e,M=String(n.key),H=jI(t,n),j=(y,v)=>{y&&kn(y,r,9,v)},E=(y,v)=>{const P=v[1];j(y,v),le(y)?y.every(A=>A.length<=1)&&P():y.length<=1&&P()},_={mode:o,persisted:a,beforeEnter(y){let v=c;if(!t.isMounted)if(s)v=C||c;else return;y[xn]&&y[xn](!0);const P=H[M];P&&Ui(n,P)&&P.el[xn]&&P.el[xn](),j(v,[y])},enter(y){if(H[M]===n)return;let v=l,P=h,A=f;if(!t.isMounted)if(s)v=V||l,P=D||h,A=x||f;else return;let T=!1;y[Ko]=ut=>{T||(T=!0,ut?j(A,[y]):j(P,[y]),_.delayedLeave&&_.delayedLeave(),y[Ko]=void 0)};const Se=y[Ko].bind(null,!1);v?E(v,[y,Se]):Se()},leave(y,v){const P=String(n.key);if(y[Ko]&&y[Ko](!0),t.isUnmounting)return v();j(m,[y]);let A=!1;y[xn]=Se=>{A||(A=!0,v(),Se?j(R,[y]):j(b,[y]),y[xn]=void 0,H[P]===n&&delete H[P])};const T=y[xn].bind(null,!1);H[P]=n,g?E(g,[y,T]):T()},clone(y){const v=ld(y,e,t,r,i);return i&&i(v),v}};return _}function Ah(n){if(dl(n))return n=ii(n),n.children=null,n}function tg(n){if(!dl(n))return FI(n.type)&&n.children?qI(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&_e(t.default))return t.default()}}function Na(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Na(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function GI(n,e=!1,t){let r=[],i=0;for(let s=0;s<n.length;s++){let o=n[s];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:s);o.type===an?(o.patchFlag&128&&i++,r=r.concat(GI(o.children,e,a))):(e||o.type!==Ut)&&r.push(a!=null?ii(o,{key:a}):o)}if(i>1)for(let s=0;s<r.length;s++)r[s].patchFlag=-2;return r}function KI(n,e){return _e(n)?It({name:n.name},e,{setup:n}):n}function $I(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function ng(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Ru=new WeakMap;function ma(n,e,t,r,i=!1){if(le(n)){n.forEach((R,C)=>ma(R,e&&(le(e)?e[C]:e),t,r,i));return}if(Fs(r)&&!i){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&ma(n,e,t,r.component.subTree);return}const s=r.shapeFlag&4?gl(r.component):r.el,o=i?null:s,{i:a,r:c}=n,l=e&&e.r,h=a.refs===Ue?a.refs={}:a.refs,f=a.setupState,m=Pe(f),g=f===Ue?rI:R=>ng(h,R)?!1:Ne(m,R),b=(R,C)=>!(C&&ng(h,C));if(l!=null&&l!==c){if(rg(e),$e(l))h[l]=null,g(l)&&(f[l]=null);else if(it(l)){const R=e;b(l,R.k)&&(l.value=null),R.k&&(h[R.k]=null)}}if(_e(c))sc(c,a,12,[o,h]);else{const R=$e(c),C=it(c);if(R||C){const V=()=>{if(n.f){const D=R?g(c)?f[c]:h[c]:b()||!n.k?c.value:h[n.k];if(i)le(D)&&ef(D,s);else if(le(D))D.includes(s)||D.push(s);else if(R)h[c]=[s],g(c)&&(f[c]=h[c]);else{const x=[s];b(c,n.k)&&(c.value=x),n.k&&(h[n.k]=x)}}else R?(h[c]=o,g(c)&&(f[c]=o)):C&&(b(c,n.k)&&(c.value=o),n.k&&(h[n.k]=o))};if(o){const D=()=>{V(),Ru.delete(n)};D.id=-1,Ru.set(n,D),Ht(D,t)}else rg(n),V()}}}function rg(n){const e=Ru.get(n);e&&(e.flags|=8,Ru.delete(n))}al().requestIdleCallback;al().cancelIdleCallback;const Fs=n=>!!n.type.__asyncLoader,dl=n=>n.type.__isKeepAlive;function VR(n,e){zI(n,"a",e)}function OR(n,e){zI(n,"da",e)}function zI(n,e,t=Bt){const r=n.__wdc||(n.__wdc=()=>{let i=t;for(;i;){if(i.isDeactivated)return;i=i.parent}return n()});if(fl(e,r,t),t){let i=t.parent;for(;i&&i.parent;)dl(i.parent.vnode)&&xR(r,e,t,i),i=i.parent}}function xR(n,e,t,r){const i=fl(e,n,r,!0);QI(()=>{ef(r[e],i)},t)}function fl(n,e,t=Bt,r=!1){if(t){const i=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{yr();const a=oc(t),c=kn(e,t,n,o);return a(),Ir(),c});return r?i.unshift(s):i.push(s),s}}const Sr=n=>(e,t=Bt)=>{(!Ma||n==="sp")&&fl(n,(...r)=>e(...r),t)},LR=Sr("bm"),HI=Sr("m"),MR=Sr("bu"),FR=Sr("u"),WI=Sr("bum"),QI=Sr("um"),UR=Sr("sp"),BR=Sr("rtg"),qR=Sr("rtc");function jR(n,e=Bt){fl("ec",n,e)}const JI="components";function GR(n,e){return XI(JI,n,!0,e)||n}const YI=Symbol.for("v-ndc");function KR(n){return $e(n)?XI(JI,n,!1)||n:n||YI}function XI(n,e,t=!0,r=!1){const i=Nt||Bt;if(i){const s=i.type;{const a=DS(s,!1);if(a&&(a===e||a===Jt(e)||a===sl(Jt(e))))return s}const o=ig(i[n]||s[n],e)||ig(i.appContext[n],e);return!o&&r?s:o}}function ig(n,e){return n&&(n[e]||n[Jt(e)]||n[sl(Jt(e))])}function TU(n,e,t,r){let i;const s=t,o=le(n);if(o||$e(n)){const a=o&&gr(n);let c=!1,l=!1;a&&(c=!dn(n),l=vr(n),n=cl(n)),i=new Array(n.length);for(let h=0,f=n.length;h<f;h++)i[h]=e(c?l?Ks(Dn(n[h])):Dn(n[h]):n[h],h,void 0,s)}else if(typeof n=="number"){i=new Array(n);for(let a=0;a<n;a++)i[a]=e(a+1,a,void 0,s)}else if(Ve(n))if(n[Symbol.iterator])i=Array.from(n,(a,c)=>e(a,c,void 0,s));else{const a=Object.keys(n);i=new Array(a.length);for(let c=0,l=a.length;c<l;c++){const h=a[c];i[c]=e(n[h],h,c,s)}}else i=[];return i}function wU(n,e,t={},r,i){if(Nt.ce||Nt.parent&&Fs(Nt.parent)&&Nt.parent.ce){const l=Object.keys(t).length>0;return e!=="default"&&(t.name=e),Va(),xa(an,null,[qt("slot",t,r&&r())],l?-2:64)}let s=n[e];s&&s._c&&(s._d=!1),Va();const o=s&&ZI(s(t)),a=t.key||o&&o.key,c=xa(an,{key:(a&&!pn(a)?a:`_${e}`)+(!o&&r?"_fb":"")},o||(r?r():[]),o&&n._===1?64:-2);return c.scopeId&&(c.slotScopeIds=[c.scopeId+"-s"]),s&&s._c&&(s._d=!0),c}function ZI(n){return n.some(e=>La(e)?!(e.type===Ut||e.type===an&&!ZI(e.children)):!0)?n:null}const hd=n=>n?Iv(n)?gl(n):hd(n.parent):null,ga=It(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>hd(n.parent),$root:n=>hd(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>tv(n),$forceUpdate:n=>n.f||(n.f=()=>{df(n.update)}),$nextTick:n=>n.n||(n.n=hl.bind(n.proxy)),$watch:n=>RR.bind(n)}),bh=(n,e)=>n!==Ue&&!n.__isScriptSetup&&Ne(n,e),$R={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:r,data:i,props:s,accessCache:o,type:a,appContext:c}=n;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return r[e];case 2:return i[e];case 4:return t[e];case 3:return s[e]}else{if(bh(r,e))return o[e]=1,r[e];if(i!==Ue&&Ne(i,e))return o[e]=2,i[e];if(Ne(s,e))return o[e]=3,s[e];if(t!==Ue&&Ne(t,e))return o[e]=4,t[e];dd&&(o[e]=0)}}const l=ga[e];let h,f;if(l)return e==="$attrs"&&Ft(n.attrs,"get",""),l(n);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==Ue&&Ne(t,e))return o[e]=4,t[e];if(f=c.config.globalProperties,Ne(f,e))return f[e]},set({_:n},e,t){const{data:r,setupState:i,ctx:s}=n;return bh(i,e)?(i[e]=t,!0):r!==Ue&&Ne(r,e)?(r[e]=t,!0):Ne(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:r,appContext:i,props:s,type:o}},a){let c;return!!(t[a]||n!==Ue&&a[0]!=="$"&&Ne(n,a)||bh(e,a)||Ne(s,a)||Ne(r,a)||Ne(ga,a)||Ne(i.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Ne(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function sg(n){return le(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let dd=!0;function zR(n){const e=tv(n),t=n.proxy,r=n.ctx;dd=!1,e.beforeCreate&&og(e.beforeCreate,n,"bc");const{data:i,computed:s,methods:o,watch:a,provide:c,inject:l,created:h,beforeMount:f,mounted:m,beforeUpdate:g,updated:b,activated:R,deactivated:C,beforeDestroy:V,beforeUnmount:D,destroyed:x,unmounted:M,render:H,renderTracked:j,renderTriggered:E,errorCaptured:_,serverPrefetch:y,expose:v,inheritAttrs:P,components:A,directives:T,filters:Se}=e;if(l&&HR(l,r,null),o)for(const pe in o){const Te=o[pe];_e(Te)&&(r[pe]=Te.bind(t))}if(i){const pe=i.call(t,t);Ve(pe)&&(n.data=ic(pe))}if(dd=!0,s)for(const pe in s){const Te=s[pe],rn=_e(Te)?Te.bind(t,t):_e(Te.get)?Te.get.bind(t,t):$n,bn=!_e(Te)&&_e(Te.set)?Te.set.bind(t):$n,_n=Dt({get:rn,set:bn});Object.defineProperty(r,pe,{enumerable:!0,configurable:!0,get:()=>_n.value,set:Xe=>_n.value=Xe})}if(a)for(const pe in a)ev(a[pe],r,t,pe);if(c){const pe=_e(c)?c.call(t):c;Reflect.ownKeys(pe).forEach(Te=>{au(Te,pe[Te])})}h&&og(h,n,"c");function Oe(pe,Te){le(Te)?Te.forEach(rn=>pe(rn.bind(t))):Te&&pe(Te.bind(t))}if(Oe(LR,f),Oe(HI,m),Oe(MR,g),Oe(FR,b),Oe(VR,R),Oe(OR,C),Oe(jR,_),Oe(qR,j),Oe(BR,E),Oe(WI,D),Oe(QI,M),Oe(UR,y),le(v))if(v.length){const pe=n.exposed||(n.exposed={});v.forEach(Te=>{Object.defineProperty(pe,Te,{get:()=>t[Te],set:rn=>t[Te]=rn,enumerable:!0})})}else n.exposed||(n.exposed={});H&&n.render===$n&&(n.render=H),P!=null&&(n.inheritAttrs=P),A&&(n.components=A),T&&(n.directives=T),y&&$I(n)}function HR(n,e,t=$n){le(n)&&(n=fd(n));for(const r in n){const i=n[r];let s;Ve(i)?"default"in i?s=Tn(i.from||r,i.default,!0):s=Tn(i.from||r):s=Tn(i),it(s)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[r]=s}}function og(n,e,t){kn(le(n)?n.map(r=>r.bind(e.proxy)):n.bind(e.proxy),e,t)}function ev(n,e,t,r){let i=r.includes(".")?LI(t,r):()=>t[r];if($e(n)){const s=e[n];_e(s)&&Ms(i,s)}else if(_e(n))Ms(i,n.bind(t));else if(Ve(n))if(le(n))n.forEach(s=>ev(s,e,t,r));else{const s=_e(n.handler)?n.handler.bind(t):e[n.handler];_e(s)&&Ms(i,s,n)}}function tv(n){const e=n.type,{mixins:t,extends:r}=e,{mixins:i,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let c;return a?c=a:!i.length&&!t&&!r?c=e:(c={},i.length&&i.forEach(l=>Su(c,l,o,!0)),Su(c,e,o)),Ve(e)&&s.set(e,c),c}function Su(n,e,t,r=!1){const{mixins:i,extends:s}=e;s&&Su(n,s,t,!0),i&&i.forEach(o=>Su(n,o,t,!0));for(const o in e)if(!(r&&o==="expose")){const a=WR[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const WR={data:ag,props:cg,emits:cg,methods:na,computed:na,beforeCreate:zt,created:zt,beforeMount:zt,mounted:zt,beforeUpdate:zt,updated:zt,beforeDestroy:zt,beforeUnmount:zt,destroyed:zt,unmounted:zt,activated:zt,deactivated:zt,errorCaptured:zt,serverPrefetch:zt,components:na,directives:na,watch:JR,provide:ag,inject:QR};function ag(n,e){return e?n?function(){return It(_e(n)?n.call(this,this):n,_e(e)?e.call(this,this):e)}:e:n}function QR(n,e){return na(fd(n),fd(e))}function fd(n){if(le(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function zt(n,e){return n?[...new Set([].concat(n,e))]:e}function na(n,e){return n?It(Object.create(null),n,e):e}function cg(n,e){return n?le(n)&&le(e)?[...new Set([...n,...e])]:It(Object.create(null),sg(n),sg(e??{})):e}function JR(n,e){if(!n)return e;if(!e)return n;const t=It(Object.create(null),n);for(const r in e)t[r]=zt(n[r],e[r]);return t}function nv(){return{app:null,config:{isNativeTag:rI,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let YR=0;function XR(n,e){return function(r,i=null){_e(r)||(r=It({},r)),i!=null&&!Ve(i)&&(i=null);const s=nv(),o=new WeakSet,a=[];let c=!1;const l=s.app={_uid:YR++,_component:r,_props:i,_container:null,_context:s,_instance:null,version:NS,get config(){return s.config},set config(h){},use(h,...f){return o.has(h)||(h&&_e(h.install)?(o.add(h),h.install(l,...f)):_e(h)&&(o.add(h),h(l,...f))),l},mixin(h){return s.mixins.includes(h)||s.mixins.push(h),l},component(h,f){return f?(s.components[h]=f,l):s.components[h]},directive(h,f){return f?(s.directives[h]=f,l):s.directives[h]},mount(h,f,m){if(!c){const g=l._ceVNode||qt(r,i);return g.appContext=s,m===!0?m="svg":m===!1&&(m=void 0),n(g,h,m),c=!0,l._container=h,h.__vue_app__=l,gl(g.component)}},onUnmount(h){a.push(h)},unmount(){c&&(kn(a,l._instance,16),n(null,l._container),delete l._container.__vue_app__)},provide(h,f){return s.provides[h]=f,l},runWithContext(h){const f=Wi;Wi=l;try{return h()}finally{Wi=f}}};return l}}let Wi=null;const ZR=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Jt(e)}Modifiers`]||n[`${_i(e)}Modifiers`];function eS(n,e,...t){if(n.isUnmounted)return;const r=n.vnode.props||Ue;let i=t;const s=e.startsWith("update:"),o=s&&ZR(r,e.slice(7));o&&(o.trim&&(i=t.map(h=>$e(h)?h.trim():h)),o.number&&(i=t.map(ol)));let a,c=r[a=Ih(e)]||r[a=Ih(Jt(e))];!c&&s&&(c=r[a=Ih(_i(e))]),c&&kn(c,n,6,i);const l=r[a+"Once"];if(l){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,kn(l,n,6,i)}}const tS=new WeakMap;function rv(n,e,t=!1){const r=t?tS:e.emitsCache,i=r.get(n);if(i!==void 0)return i;const s=n.emits;let o={},a=!1;if(!_e(n)){const c=l=>{const h=rv(l,e,!0);h&&(a=!0,It(o,h))};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}return!s&&!a?(Ve(n)&&r.set(n,null),null):(le(s)?s.forEach(c=>o[c]=null):It(o,s),Ve(n)&&r.set(n,o),o)}function pl(n,e){return!n||!tl(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ne(n,e[0].toLowerCase()+e.slice(1))||Ne(n,_i(e))||Ne(n,e))}function ug(n){const{type:e,vnode:t,proxy:r,withProxy:i,propsOptions:[s],slots:o,attrs:a,emit:c,render:l,renderCache:h,props:f,data:m,setupState:g,ctx:b,inheritAttrs:R}=n,C=bu(n);let V,D;try{if(t.shapeFlag&4){const M=i||r,H=M;V=Mn(l.call(H,M,h,f,g,m,b)),D=a}else{const M=e;V=Mn(M.length>1?M(f,{attrs:a,slots:o,emit:c}):M(f,null)),D=e.props?a:nS(a)}}catch(M){_a.length=0,ll(M,n,1),V=qt(Ut)}let x=V;if(D&&R!==!1){const M=Object.keys(D),{shapeFlag:H}=x;M.length&&H&7&&(s&&M.some(nl)&&(D=rS(D,s)),x=ii(x,D,!1,!0))}return t.dirs&&(x=ii(x,null,!1,!0),x.dirs=x.dirs?x.dirs.concat(t.dirs):t.dirs),t.transition&&Na(x,t.transition),V=x,bu(C),V}const nS=n=>{let e;for(const t in n)(t==="class"||t==="style"||tl(t))&&((e||(e={}))[t]=n[t]);return e},rS=(n,e)=>{const t={};for(const r in n)(!nl(r)||!(r.slice(9)in e))&&(t[r]=n[r]);return t};function iS(n,e,t){const{props:r,children:i,component:s}=n,{props:o,children:a,patchFlag:c}=e,l=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&c>=0){if(c&1024)return!0;if(c&16)return r?lg(r,o,l):!!o;if(c&8){const h=e.dynamicProps;for(let f=0;f<h.length;f++){const m=h[f];if(iv(o,r,m)&&!pl(l,m))return!0}}}else return(i||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?lg(r,o,l):!0:!!o;return!1}function lg(n,e,t){const r=Object.keys(e);if(r.length!==Object.keys(n).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(iv(e,n,s)&&!pl(t,s))return!0}return!1}function iv(n,e,t){const r=n[t],i=e[t];return t==="style"&&Ve(r)&&Ve(i)?!ri(r,i):r!==i}function sS({vnode:n,parent:e,suspense:t},r){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.suspense.vnode.el=i.el=r,n=i),i===n)(n=e.vnode).el=r,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=r)}const sv={},ov=()=>Object.create(sv),av=n=>Object.getPrototypeOf(n)===sv;function oS(n,e,t,r=!1){const i={},s=ov();n.propsDefaults=Object.create(null),cv(n,e,i,s);for(const o in n.propsOptions[0])o in i||(i[o]=void 0);t?n.props=r?i:PI(i):n.type.props?n.props=i:n.props=s,n.attrs=s}function aS(n,e,t,r){const{props:i,attrs:s,vnode:{patchFlag:o}}=n,a=Pe(i),[c]=n.propsOptions;let l=!1;if((r||o>0)&&!(o&16)){if(o&8){const h=n.vnode.dynamicProps;for(let f=0;f<h.length;f++){let m=h[f];if(pl(n.emitsOptions,m))continue;const g=e[m];if(c)if(Ne(s,m))g!==s[m]&&(s[m]=g,l=!0);else{const b=Jt(m);i[b]=pd(c,a,b,g,n,!1)}else g!==s[m]&&(s[m]=g,l=!0)}}}else{cv(n,e,i,s)&&(l=!0);let h;for(const f in a)(!e||!Ne(e,f)&&((h=_i(f))===f||!Ne(e,h)))&&(c?t&&(t[f]!==void 0||t[h]!==void 0)&&(i[f]=pd(c,a,f,void 0,n,!0)):delete i[f]);if(s!==a)for(const f in s)(!e||!Ne(e,f))&&(delete s[f],l=!0)}l&&sr(n.attrs,"set","")}function cv(n,e,t,r){const[i,s]=n.propsOptions;let o=!1,a;if(e)for(let c in e){if(da(c))continue;const l=e[c];let h;i&&Ne(i,h=Jt(c))?!s||!s.includes(h)?t[h]=l:(a||(a={}))[h]=l:pl(n.emitsOptions,c)||(!(c in r)||l!==r[c])&&(r[c]=l,o=!0)}if(s){const c=Pe(t),l=a||Ue;for(let h=0;h<s.length;h++){const f=s[h];t[f]=pd(i,c,f,l[f],n,!Ne(l,f))}}return o}function pd(n,e,t,r,i,s){const o=n[t];if(o!=null){const a=Ne(o,"default");if(a&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&_e(c)){const{propsDefaults:l}=i;if(t in l)r=l[t];else{const h=oc(i);r=l[t]=c.call(null,e),h()}}else r=c;i.ce&&i.ce._setProp(t,r)}o[0]&&(s&&!a?r=!1:o[1]&&(r===""||r===_i(t))&&(r=!0))}return r}const cS=new WeakMap;function uv(n,e,t=!1){const r=t?cS:e.propsCache,i=r.get(n);if(i)return i;const s=n.props,o={},a=[];let c=!1;if(!_e(n)){const h=f=>{c=!0;const[m,g]=uv(f,e,!0);It(o,m),g&&a.push(...g)};!t&&e.mixins.length&&e.mixins.forEach(h),n.extends&&h(n.extends),n.mixins&&n.mixins.forEach(h)}if(!s&&!c)return Ve(n)&&r.set(n,Os),Os;if(le(s))for(let h=0;h<s.length;h++){const f=Jt(s[h]);hg(f)&&(o[f]=Ue)}else if(s)for(const h in s){const f=Jt(h);if(hg(f)){const m=s[h],g=o[f]=le(m)||_e(m)?{type:m}:It({},m),b=g.type;let R=!1,C=!0;if(le(b))for(let V=0;V<b.length;++V){const D=b[V],x=_e(D)&&D.name;if(x==="Boolean"){R=!0;break}else x==="String"&&(C=!1)}else R=_e(b)&&b.name==="Boolean";g[0]=R,g[1]=C,(R||Ne(g,"default"))&&a.push(f)}}const l=[o,a];return Ve(n)&&r.set(n,l),l}function hg(n){return n[0]!=="$"&&!da(n)}const pf=n=>n==="_"||n==="_ctx"||n==="$stable",mf=n=>le(n)?n.map(Mn):[Mn(n)],uS=(n,e,t)=>{if(e._n)return e;const r=ad((...i)=>mf(e(...i)),t);return r._c=!1,r},lv=(n,e,t)=>{const r=n._ctx;for(const i in n){if(pf(i))continue;const s=n[i];if(_e(s))e[i]=uS(i,s,r);else if(s!=null){const o=mf(s);e[i]=()=>o}}},hv=(n,e)=>{const t=mf(e);n.slots.default=()=>t},dv=(n,e,t)=>{for(const r in e)(t||!pf(r))&&(n[r]=e[r])},lS=(n,e,t)=>{const r=n.slots=ov();if(n.vnode.shapeFlag&32){const i=e._;i?(dv(r,e,t),t&&aI(r,"_",i,!0)):lv(e,r)}else e&&hv(n,e)},hS=(n,e,t)=>{const{vnode:r,slots:i}=n;let s=!0,o=Ue;if(r.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:dv(i,e,t):(s=!e.$stable,lv(e,i)),o=e}else e&&(hv(n,e),o={default:1});if(s)for(const a in i)!pf(a)&&o[a]==null&&delete i[a]},Ht=gS;function dS(n){return fS(n)}function fS(n,e){const t=al();t.__VUE__=!0;const{insert:r,remove:i,patchProp:s,createElement:o,createText:a,createComment:c,setText:l,setElementText:h,parentNode:f,nextSibling:m,setScopeId:g=$n,insertStaticContent:b}=n,R=(w,S,k,U=null,G=null,q=null,ee=void 0,X=null,Q=!!S.dynamicChildren)=>{if(w===S)return;w&&!Ui(w,S)&&(U=B(w),Xe(w,G,q,!0),w=null),S.patchFlag===-2&&(Q=!1,S.dynamicChildren=null);const{type:z,ref:he,shapeFlag:ne}=S;switch(z){case ml:C(w,S,k,U);break;case Ut:V(w,S,k,U);break;case cu:w==null&&D(S,k,U,ee);break;case an:A(w,S,k,U,G,q,ee,X,Q);break;default:ne&1?H(w,S,k,U,G,q,ee,X,Q):ne&6?T(w,S,k,U,G,q,ee,X,Q):(ne&64||ne&128)&&z.process(w,S,k,U,G,q,ee,X,Q,ce)}he!=null&&G?ma(he,w&&w.ref,q,S||w,!S):he==null&&w&&w.ref!=null&&ma(w.ref,null,q,w,!0)},C=(w,S,k,U)=>{if(w==null)r(S.el=a(S.children),k,U);else{const G=S.el=w.el;S.children!==w.children&&l(G,S.children)}},V=(w,S,k,U)=>{w==null?r(S.el=c(S.children||""),k,U):S.el=w.el},D=(w,S,k,U)=>{[w.el,w.anchor]=b(w.children,S,k,U,w.el,w.anchor)},x=({el:w,anchor:S},k,U)=>{let G;for(;w&&w!==S;)G=m(w),r(w,k,U),w=G;r(S,k,U)},M=({el:w,anchor:S})=>{let k;for(;w&&w!==S;)k=m(w),i(w),w=k;i(S)},H=(w,S,k,U,G,q,ee,X,Q)=>{if(S.type==="svg"?ee="svg":S.type==="math"&&(ee="mathml"),w==null)j(S,k,U,G,q,ee,X,Q);else{const z=w.el&&w.el._isVueCE?w.el:null;try{z&&z._beginPatch(),y(w,S,G,q,ee,X,Q)}finally{z&&z._endPatch()}}},j=(w,S,k,U,G,q,ee,X)=>{let Q,z;const{props:he,shapeFlag:ne,transition:ue,dirs:de}=w;if(Q=w.el=o(w.type,q,he&&he.is,he),ne&8?h(Q,w.children):ne&16&&_(w.children,Q,null,U,G,Rh(w,q),ee,X),de&&Di(w,null,U,"created"),E(Q,w,w.scopeId,ee,U),he){for(const ye in he)ye!=="value"&&!da(ye)&&s(Q,ye,null,he[ye],q,U);"value"in he&&s(Q,"value",null,he.value,q),(z=he.onVnodeBeforeMount)&&Vn(z,U,w)}de&&Di(w,null,U,"beforeMount");const fe=pS(G,ue);fe&&ue.beforeEnter(Q),r(Q,S,k),((z=he&&he.onVnodeMounted)||fe||de)&&Ht(()=>{try{z&&Vn(z,U,w),fe&&ue.enter(Q),de&&Di(w,null,U,"mounted")}finally{}},G)},E=(w,S,k,U,G)=>{if(k&&g(w,k),U)for(let q=0;q<U.length;q++)g(w,U[q]);if(G){let q=G.subTree;if(S===q||mv(q.type)&&(q.ssContent===S||q.ssFallback===S)){const ee=G.vnode;E(w,ee,ee.scopeId,ee.slotScopeIds,G.parent)}}},_=(w,S,k,U,G,q,ee,X,Q=0)=>{for(let z=Q;z<w.length;z++){const he=w[z]=X?ir(w[z]):Mn(w[z]);R(null,he,S,k,U,G,q,ee,X)}},y=(w,S,k,U,G,q,ee)=>{const X=S.el=w.el;let{patchFlag:Q,dynamicChildren:z,dirs:he}=S;Q|=w.patchFlag&16;const ne=w.props||Ue,ue=S.props||Ue;let de;if(k&&ki(k,!1),(de=ue.onVnodeBeforeUpdate)&&Vn(de,k,S,w),he&&Di(S,w,k,"beforeUpdate"),k&&ki(k,!0),(ne.innerHTML&&ue.innerHTML==null||ne.textContent&&ue.textContent==null)&&h(X,""),z?v(w.dynamicChildren,z,X,k,U,Rh(S,G),q):ee||Te(w,S,X,null,k,U,Rh(S,G),q,!1),Q>0){if(Q&16)P(X,ne,ue,k,G);else if(Q&2&&ne.class!==ue.class&&s(X,"class",null,ue.class,G),Q&4&&s(X,"style",ne.style,ue.style,G),Q&8){const fe=S.dynamicProps;for(let ye=0;ye<fe.length;ye++){const De=fe[ye],et=ne[De],ft=ue[De];(ft!==et||De==="value")&&s(X,De,et,ft,G,k)}}Q&1&&w.children!==S.children&&h(X,S.children)}else!ee&&z==null&&P(X,ne,ue,k,G);((de=ue.onVnodeUpdated)||he)&&Ht(()=>{de&&Vn(de,k,S,w),he&&Di(S,w,k,"updated")},U)},v=(w,S,k,U,G,q,ee)=>{for(let X=0;X<S.length;X++){const Q=w[X],z=S[X],he=Q.el&&(Q.type===an||!Ui(Q,z)||Q.shapeFlag&198)?f(Q.el):k;R(Q,z,he,null,U,G,q,ee,!0)}},P=(w,S,k,U,G)=>{if(S!==k){if(S!==Ue)for(const q in S)!da(q)&&!(q in k)&&s(w,q,S[q],null,G,U);for(const q in k){if(da(q))continue;const ee=k[q],X=S[q];ee!==X&&q!=="value"&&s(w,q,X,ee,G,U)}"value"in k&&s(w,"value",S.value,k.value,G)}},A=(w,S,k,U,G,q,ee,X,Q)=>{const z=S.el=w?w.el:a(""),he=S.anchor=w?w.anchor:a("");let{patchFlag:ne,dynamicChildren:ue,slotScopeIds:de}=S;de&&(X=X?X.concat(de):de),w==null?(r(z,k,U),r(he,k,U),_(S.children||[],k,he,G,q,ee,X,Q)):ne>0&&ne&64&&ue&&w.dynamicChildren&&w.dynamicChildren.length===ue.length?(v(w.dynamicChildren,ue,k,G,q,ee,X),(S.key!=null||G&&S===G.subTree)&&gf(w,S,!0)):Te(w,S,k,he,G,q,ee,X,Q)},T=(w,S,k,U,G,q,ee,X,Q)=>{S.slotScopeIds=X,w==null?S.shapeFlag&512?G.ctx.activate(S,k,U,ee,Q):Se(S,k,U,G,q,ee,Q):ut(w,S,Q)},Se=(w,S,k,U,G,q,ee)=>{const X=w.component=bS(w,U,G);if(dl(w)&&(X.ctx.renderer=ce),RS(X,!1,ee),X.asyncDep){if(G&&G.registerDep(X,Oe,ee),!w.el){const Q=X.subTree=qt(Ut);V(null,Q,S,k),w.placeholder=Q.el}}else Oe(X,w,S,k,G,q,ee)},ut=(w,S,k)=>{const U=S.component=w.component;if(iS(w,S,k))if(U.asyncDep&&!U.asyncResolved){pe(U,S,k);return}else U.next=S,U.update();else S.el=w.el,U.vnode=S},Oe=(w,S,k,U,G,q,ee)=>{const X=()=>{if(w.isMounted){let{next:ne,bu:ue,u:de,parent:fe,vnode:ye}=w;{const Vt=fv(w);if(Vt){ne&&(ne.el=ye.el,pe(w,ne,ee)),Vt.asyncDep.then(()=>{Ht(()=>{w.isUnmounted||z()},G)});return}}let De=ne,et;ki(w,!1),ne?(ne.el=ye.el,pe(w,ne,ee)):ne=ye,ue&&ou(ue),(et=ne.props&&ne.props.onVnodeBeforeUpdate)&&Vn(et,fe,ne,ye),ki(w,!0);const ft=ug(w),yn=w.subTree;w.subTree=ft,R(yn,ft,f(yn.el),B(yn),w,G,q),ne.el=ft.el,De===null&&sS(w,ft.el),de&&Ht(de,G),(et=ne.props&&ne.props.onVnodeUpdated)&&Ht(()=>Vn(et,fe,ne,ye),G)}else{let ne;const{el:ue,props:de}=S,{bm:fe,m:ye,parent:De,root:et,type:ft}=w,yn=Fs(S);ki(w,!1),fe&&ou(fe),!yn&&(ne=de&&de.onVnodeBeforeMount)&&Vn(ne,De,S),ki(w,!0);{et.ce&&et.ce._hasShadowRoot()&&et.ce._injectChildStyle(ft,w.parent?w.parent.type:void 0);const Vt=w.subTree=ug(w);R(null,Vt,k,U,w,G,q),S.el=Vt.el}if(ye&&Ht(ye,G),!yn&&(ne=de&&de.onVnodeMounted)){const Vt=S;Ht(()=>Vn(ne,De,Vt),G)}(S.shapeFlag&256||De&&Fs(De.vnode)&&De.vnode.shapeFlag&256)&&w.a&&Ht(w.a,G),w.isMounted=!0,S=k=U=null}};w.scope.on();const Q=w.effect=new pI(X);w.scope.off();const z=w.update=Q.run.bind(Q),he=w.job=Q.runIfDirty.bind(Q);he.i=w,he.id=w.uid,Q.scheduler=()=>df(he),ki(w,!0),z()},pe=(w,S,k)=>{S.component=w;const U=w.vnode.props;w.vnode=S,w.next=null,aS(w,S.props,U,k),hS(w,S.children,k),yr(),Xm(w),Ir()},Te=(w,S,k,U,G,q,ee,X,Q=!1)=>{const z=w&&w.children,he=w?w.shapeFlag:0,ne=S.children,{patchFlag:ue,shapeFlag:de}=S;if(ue>0){if(ue&128){bn(z,ne,k,U,G,q,ee,X,Q);return}else if(ue&256){rn(z,ne,k,U,G,q,ee,X,Q);return}}de&8?(he&16&&Xt(z,G,q),ne!==z&&h(k,ne)):he&16?de&16?bn(z,ne,k,U,G,q,ee,X,Q):Xt(z,G,q,!0):(he&8&&h(k,""),de&16&&_(ne,k,U,G,q,ee,X,Q))},rn=(w,S,k,U,G,q,ee,X,Q)=>{w=w||Os,S=S||Os;const z=w.length,he=S.length,ne=Math.min(z,he);let ue;for(ue=0;ue<ne;ue++){const de=S[ue]=Q?ir(S[ue]):Mn(S[ue]);R(w[ue],de,k,null,G,q,ee,X,Q)}z>he?Xt(w,G,q,!0,!1,ne):_(S,k,U,G,q,ee,X,Q,ne)},bn=(w,S,k,U,G,q,ee,X,Q)=>{let z=0;const he=S.length;let ne=w.length-1,ue=he-1;for(;z<=ne&&z<=ue;){const de=w[z],fe=S[z]=Q?ir(S[z]):Mn(S[z]);if(Ui(de,fe))R(de,fe,k,null,G,q,ee,X,Q);else break;z++}for(;z<=ne&&z<=ue;){const de=w[ne],fe=S[ue]=Q?ir(S[ue]):Mn(S[ue]);if(Ui(de,fe))R(de,fe,k,null,G,q,ee,X,Q);else break;ne--,ue--}if(z>ne){if(z<=ue){const de=ue+1,fe=de<he?S[de].el:U;for(;z<=ue;)R(null,S[z]=Q?ir(S[z]):Mn(S[z]),k,fe,G,q,ee,X,Q),z++}}else if(z>ue)for(;z<=ne;)Xe(w[z],G,q,!0),z++;else{const de=z,fe=z,ye=new Map;for(z=fe;z<=ue;z++){const St=S[z]=Q?ir(S[z]):Mn(S[z]);St.key!=null&&ye.set(St.key,z)}let De,et=0;const ft=ue-fe+1;let yn=!1,Vt=0;const xr=new Array(ft);for(z=0;z<ft;z++)xr[z]=0;for(z=de;z<=ne;z++){const St=w[z];if(et>=ft){Xe(St,G,q,!0);continue}let In;if(St.key!=null)In=ye.get(St.key);else for(De=fe;De<=ue;De++)if(xr[De-fe]===0&&Ui(St,S[De])){In=De;break}In===void 0?Xe(St,G,q,!0):(xr[In-fe]=z+1,In>=Vt?Vt=In:yn=!0,R(St,S[In],k,null,G,q,ee,X,Q),et++)}const Do=yn?mS(xr):Os;for(De=Do.length-1,z=ft-1;z>=0;z--){const St=fe+z,In=S[St],Pc=S[St+1],ms=St+1<he?Pc.el||pv(Pc):U;xr[z]===0?R(null,In,k,ms,G,q,ee,X,Q):yn&&(De<0||z!==Do[De]?_n(In,k,ms,2):De--)}}},_n=(w,S,k,U,G=null)=>{const{el:q,type:ee,transition:X,children:Q,shapeFlag:z}=w;if(z&6){_n(w.component.subTree,S,k,U);return}if(z&128){w.suspense.move(S,k,U);return}if(z&64){ee.move(w,S,k,ce);return}if(ee===an){r(q,S,k);for(let ne=0;ne<Q.length;ne++)_n(Q[ne],S,k,U);r(w.anchor,S,k);return}if(ee===cu){x(w,S,k);return}if(U!==2&&z&1&&X)if(U===0)X.beforeEnter(q),r(q,S,k),Ht(()=>X.enter(q),G);else{const{leave:ne,delayLeave:ue,afterLeave:de}=X,fe=()=>{w.ctx.isUnmounted?i(q):r(q,S,k)},ye=()=>{q._isLeaving&&q[xn](!0),ne(q,()=>{fe(),de&&de()})};ue?ue(q,fe,ye):ye()}else r(q,S,k)},Xe=(w,S,k,U=!1,G=!1)=>{const{type:q,props:ee,ref:X,children:Q,dynamicChildren:z,shapeFlag:he,patchFlag:ne,dirs:ue,cacheIndex:de,memo:fe}=w;if(ne===-2&&(G=!1),X!=null&&(yr(),ma(X,null,k,w,!0),Ir()),de!=null&&(S.renderCache[de]=void 0),he&256){S.ctx.deactivate(w);return}const ye=he&1&&ue,De=!Fs(w);let et;if(De&&(et=ee&&ee.onVnodeBeforeUnmount)&&Vn(et,S,w),he&6)sn(w.component,k,U);else{if(he&128){w.suspense.unmount(k,U);return}ye&&Di(w,null,S,"beforeUnmount"),he&64?w.type.remove(w,S,k,ce,U):z&&!z.hasOnce&&(q!==an||ne>0&&ne&64)?Xt(z,S,k,!1,!0):(q===an&&ne&384||!G&&he&16)&&Xt(Q,S,k),U&&Ze(w)}const ft=fe!=null&&de==null;(De&&(et=ee&&ee.onVnodeUnmounted)||ye||ft)&&Ht(()=>{et&&Vn(et,S,w),ye&&Di(w,null,S,"unmounted"),ft&&(w.el=null)},k)},Ze=w=>{const{type:S,el:k,anchor:U,transition:G}=w;if(S===an){Or(k,U);return}if(S===cu){M(w);return}const q=()=>{i(k),G&&!G.persisted&&G.afterLeave&&G.afterLeave()};if(w.shapeFlag&1&&G&&!G.persisted){const{leave:ee,delayLeave:X}=G,Q=()=>ee(k,q);X?X(w.el,q,Q):Q()}else q()},Or=(w,S)=>{let k;for(;w!==S;)k=m(w),i(w),w=k;i(S)},sn=(w,S,k)=>{const{bum:U,scope:G,job:q,subTree:ee,um:X,m:Q,a:z}=w;dg(Q),dg(z),U&&ou(U),G.stop(),q&&(q.flags|=8,Xe(ee,w,S,k)),X&&Ht(X,S),Ht(()=>{w.isUnmounted=!0},S)},Xt=(w,S,k,U=!1,G=!1,q=0)=>{for(let ee=q;ee<w.length;ee++)Xe(w[ee],S,k,U,G)},B=w=>{if(w.shapeFlag&6)return B(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const S=m(w.anchor||w.el),k=S&&S[MI];return k?m(k):S};let ie=!1;const te=(w,S,k)=>{let U;w==null?S._vnode&&(Xe(S._vnode,null,null,!0),U=S._vnode.component):R(S._vnode||null,w,S,null,null,null,k),S._vnode=w,ie||(ie=!0,Xm(U),VI(),ie=!1)},ce={p:R,um:Xe,m:_n,r:Ze,mt:Se,mc:_,pc:Te,pbc:v,n:B,o:n};return{render:te,hydrate:void 0,createApp:XR(te)}}function Rh({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function ki({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function pS(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function gf(n,e,t=!1){const r=n.children,i=e.children;if(le(r)&&le(i))for(let s=0;s<r.length;s++){const o=r[s];let a=i[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[s]=ir(i[s]),a.el=o.el),!t&&a.patchFlag!==-2&&gf(o,a)),a.type===ml&&(a.patchFlag===-1&&(a=i[s]=ir(a)),a.el=o.el),a.type===Ut&&!a.el&&(a.el=o.el)}}function mS(n){const e=n.slice(),t=[0];let r,i,s,o,a;const c=n.length;for(r=0;r<c;r++){const l=n[r];if(l!==0){if(i=t[t.length-1],n[i]<l){e[r]=i,t.push(r);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<l?s=a+1:o=a;l<n[t[s]]&&(s>0&&(e[r]=t[s-1]),t[s]=r)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function fv(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:fv(e)}function dg(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function pv(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?pv(e.subTree):null}const mv=n=>n.__isSuspense;function gS(n,e){e&&e.pendingBranch?le(n)?e.effects.push(...n):e.effects.push(n):TR(n)}const an=Symbol.for("v-fgt"),ml=Symbol.for("v-txt"),Ut=Symbol.for("v-cmt"),cu=Symbol.for("v-stc"),_a=[];let ln=null;function Va(n=!1){_a.push(ln=n?null:[])}function _S(){_a.pop(),ln=_a[_a.length-1]||null}let Oa=1;function Pu(n,e=!1){Oa+=n,n<0&&ln&&e&&(ln.hasOnce=!0)}function gv(n){return n.dynamicChildren=Oa>0?ln||Os:null,_S(),Oa>0&&ln&&ln.push(n),n}function AU(n,e,t,r,i,s){return gv(yv(n,e,t,r,i,s,!0))}function xa(n,e,t,r,i){return gv(qt(n,e,t,r,i,!0))}function La(n){return n?n.__v_isVNode===!0:!1}function Ui(n,e){return n.type===e.type&&n.key===e.key}const _v=({key:n})=>n??null,uu=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?$e(n)||it(n)||_e(n)?{i:Nt,r:n,k:e,f:!!t}:n:null);function yv(n,e=null,t=null,r=0,i=null,s=n===an?0:1,o=!1,a=!1){const c={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&_v(e),ref:e&&uu(e),scopeId:xI,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Nt};return a?(_f(c,t),s&128&&n.normalize(c)):t&&(c.shapeFlag|=$e(t)?8:16),Oa>0&&!o&&ln&&(c.patchFlag>0||s&6)&&c.patchFlag!==32&&ln.push(c),c}const qt=yS;function yS(n,e=null,t=null,r=0,i=null,s=!1){if((!n||n===YI)&&(n=Ut),La(n)){const a=ii(n,e,!0);return t&&_f(a,t),Oa>0&&!s&&ln&&(a.shapeFlag&6?ln[ln.indexOf(n)]=a:ln.push(a)),a.patchFlag=-2,a}if(kS(n)&&(n=n.__vccOpts),e){e=IS(e);let{class:a,style:c}=e;a&&!$e(a)&&(e.class=nf(a)),Ve(c)&&(ul(c)&&!le(c)&&(c=It({},c)),e.style=tf(c))}const o=$e(n)?1:mv(n)?128:FI(n)?64:Ve(n)?4:_e(n)?2:0;return yv(n,e,t,r,i,o,s,!0)}function IS(n){return n?ul(n)||av(n)?It({},n):n:null}function ii(n,e,t=!1,r=!1){const{props:i,ref:s,patchFlag:o,children:a,transition:c}=n,l=e?TS(i||{},e):i,h={__v_isVNode:!0,__v_skip:!0,type:n.type,props:l,key:l&&_v(l),ref:e&&e.ref?t&&s?le(s)?s.concat(uu(e)):[s,uu(e)]:uu(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==an?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:c,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ii(n.ssContent),ssFallback:n.ssFallback&&ii(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return c&&r&&Na(h,c.clone(h)),h}function vS(n=" ",e=0){return qt(ml,null,n,e)}function bU(n,e){const t=qt(cu,null,n);return t.staticCount=e,t}function ES(n="",e=!1){return e?(Va(),xa(Ut,null,n)):qt(Ut,null,n)}function Mn(n){return n==null||typeof n=="boolean"?qt(Ut):le(n)?qt(an,null,n.slice()):La(n)?ir(n):qt(ml,null,String(n))}function ir(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ii(n)}function _f(n,e){let t=0;const{shapeFlag:r}=n;if(e==null)e=null;else if(le(e))t=16;else if(typeof e=="object")if(r&65){const i=e.default;i&&(i._c&&(i._d=!1),_f(n,i()),i._c&&(i._d=!0));return}else{t=32;const i=e._;!i&&!av(e)?e._ctx=Nt:i===3&&Nt&&(Nt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else _e(e)?(e={default:e,_ctx:Nt},t=32):(e=String(e),r&64?(t=16,e=[vS(e)]):t=8);n.children=e,n.shapeFlag|=t}function TS(...n){const e={};for(let t=0;t<n.length;t++){const r=n[t];for(const i in r)if(i==="class")e.class!==r.class&&(e.class=nf([e.class,r.class]));else if(i==="style")e.style=tf([e.style,r.style]);else if(tl(i)){const s=e[i],o=r[i];o&&s!==o&&!(le(s)&&s.includes(o))?e[i]=s?[].concat(s,o):o:o==null&&s==null&&!nl(i)&&(e[i]=o)}else i!==""&&(e[i]=r[i])}return e}function Vn(n,e,t,r=null){kn(n,e,7,[t,r])}const wS=nv();let AS=0;function bS(n,e,t){const r=n.type,i=(e?e.appContext:n.appContext)||wS,s={uid:AS++,vnode:n,type:r,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new hI(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:uv(r,i),emitsOptions:rv(r,i),emit:null,emitted:null,propsDefaults:Ue,inheritAttrs:r.inheritAttrs,ctx:Ue,data:Ue,props:Ue,attrs:Ue,slots:Ue,refs:Ue,setupState:Ue,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=eS.bind(null,s),n.ce&&n.ce(s),s}let Bt=null;const yf=()=>Bt||Nt;let Cu,md;{const n=al(),e=(t,r)=>{let i;return(i=n[t])||(i=n[t]=[]),i.push(r),s=>{i.length>1?i.forEach(o=>o(s)):i[0](s)}};Cu=e("__VUE_INSTANCE_SETTERS__",t=>Bt=t),md=e("__VUE_SSR_SETTERS__",t=>Ma=t)}const oc=n=>{const e=Bt;return Cu(n),n.scope.on(),()=>{n.scope.off(),Cu(e)}},fg=()=>{Bt&&Bt.scope.off(),Cu(null)};function Iv(n){return n.vnode.shapeFlag&4}let Ma=!1;function RS(n,e=!1,t=!1){e&&md(e);const{props:r,children:i}=n.vnode,s=Iv(n);oS(n,r,s,e),lS(n,i,t||e);const o=s?SS(n,e):void 0;return e&&md(!1),o}function SS(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,$R);const{setup:r}=t;if(r){yr();const i=n.setupContext=r.length>1?CS(n):null,s=oc(n),o=sc(r,n,0,[n.props,i]),a=iI(o);if(Ir(),s(),(a||n.sp)&&!Fs(n)&&$I(n),a){if(o.then(fg,fg),e)return o.then(c=>{pg(n,c)}).catch(c=>{ll(c,n,0)});n.asyncDep=o}else pg(n,o)}else vv(n)}function pg(n,e,t){_e(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Ve(e)&&(n.setupState=DI(e)),vv(n)}function vv(n,e,t){const r=n.type;n.render||(n.render=r.render||$n);{const i=oc(n);yr();try{zR(n)}finally{Ir(),i()}}}const PS={get(n,e){return Ft(n,"get",""),n[e]}};function CS(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,PS),slots:n.slots,emit:n.emit,expose:e}}function gl(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(DI(hf(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in ga)return ga[t](n)},has(e,t){return t in e||t in ga}})):n.proxy}function DS(n,e=!0){return _e(n)?n.displayName||n.name:n.name||e&&n.__name}function kS(n){return _e(n)&&"__vccOpts"in n}const Dt=(n,e)=>_R(n,e,Ma);function If(n,e,t){try{Pu(-1);const r=arguments.length;return r===2?Ve(e)&&!le(e)?La(e)?qt(n,null,[e]):qt(n,e):qt(n,null,e):(r>3?t=Array.prototype.slice.call(arguments,2):r===3&&La(t)&&(t=[t]),qt(n,e,t))}finally{Pu(1)}}const NS="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let gd;const mg=typeof window<"u"&&window.trustedTypes;if(mg)try{gd=mg.createPolicy("vue",{createHTML:n=>n})}catch{}const Ev=gd?n=>gd.createHTML(n):n=>n,VS="http://www.w3.org/2000/svg",OS="http://www.w3.org/1998/Math/MathML",rr=typeof document<"u"?document:null,gg=rr&&rr.createElement("template"),xS={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,r)=>{const i=e==="svg"?rr.createElementNS(VS,n):e==="mathml"?rr.createElementNS(OS,n):t?rr.createElement(n,{is:t}):rr.createElement(n);return n==="select"&&r&&r.multiple!=null&&i.setAttribute("multiple",r.multiple),i},createText:n=>rr.createTextNode(n),createComment:n=>rr.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>rr.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,r,i,s){const o=t?t.previousSibling:e.lastChild;if(i&&(i===s||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),t),!(i===s||!(i=i.nextSibling)););else{gg.innerHTML=Ev(r==="svg"?`<svg>${n}</svg>`:r==="mathml"?`<math>${n}</math>`:n);const a=gg.content;if(r==="svg"||r==="mathml"){const c=a.firstChild;for(;c.firstChild;)a.appendChild(c.firstChild);a.removeChild(c)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Ur="transition",$o="animation",Fa=Symbol("_vtc"),Tv={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},LS=It({},UI,Tv),MS=n=>(n.displayName="Transition",n.props=LS,n),FS=MS((n,{slots:e})=>If(NR,US(n),e)),Ni=(n,e=[])=>{le(n)?n.forEach(t=>t(...e)):n&&n(...e)},_g=n=>n?le(n)?n.some(e=>e.length>1):n.length>1:!1;function US(n){const e={};for(const A in n)A in Tv||(e[A]=n[A]);if(n.css===!1)return e;const{name:t="v",type:r,duration:i,enterFromClass:s=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:c=s,appearActiveClass:l=o,appearToClass:h=a,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:m=`${t}-leave-active`,leaveToClass:g=`${t}-leave-to`}=n,b=BS(i),R=b&&b[0],C=b&&b[1],{onBeforeEnter:V,onEnter:D,onEnterCancelled:x,onLeave:M,onLeaveCancelled:H,onBeforeAppear:j=V,onAppear:E=D,onAppearCancelled:_=x}=e,y=(A,T,Se,ut)=>{A._enterCancelled=ut,Vi(A,T?h:a),Vi(A,T?l:o),Se&&Se()},v=(A,T)=>{A._isLeaving=!1,Vi(A,f),Vi(A,g),Vi(A,m),T&&T()},P=A=>(T,Se)=>{const ut=A?E:D,Oe=()=>y(T,A,Se);Ni(ut,[T,Oe]),yg(()=>{Vi(T,A?c:s),tr(T,A?h:a),_g(ut)||Ig(T,r,R,Oe)})};return It(e,{onBeforeEnter(A){Ni(V,[A]),tr(A,s),tr(A,o)},onBeforeAppear(A){Ni(j,[A]),tr(A,c),tr(A,l)},onEnter:P(!1),onAppear:P(!0),onLeave(A,T){A._isLeaving=!0;const Se=()=>v(A,T);tr(A,f),A._enterCancelled?(tr(A,m),Tg(A)):(Tg(A),tr(A,m)),yg(()=>{A._isLeaving&&(Vi(A,f),tr(A,g),_g(M)||Ig(A,r,C,Se))}),Ni(M,[A,Se])},onEnterCancelled(A){y(A,!1,void 0,!0),Ni(x,[A])},onAppearCancelled(A){y(A,!0,void 0,!0),Ni(_,[A])},onLeaveCancelled(A){v(A),Ni(H,[A])}})}function BS(n){if(n==null)return null;if(Ve(n))return[Sh(n.enter),Sh(n.leave)];{const e=Sh(n);return[e,e]}}function Sh(n){return xb(n)}function tr(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[Fa]||(n[Fa]=new Set)).add(e)}function Vi(n,e){e.split(/\s+/).forEach(r=>r&&n.classList.remove(r));const t=n[Fa];t&&(t.delete(e),t.size||(n[Fa]=void 0))}function yg(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let qS=0;function Ig(n,e,t,r){const i=n._endId=++qS,s=()=>{i===n._endId&&r()};if(t!=null)return setTimeout(s,t);const{type:o,timeout:a,propCount:c}=jS(n,e);if(!o)return r();const l=o+"end";let h=0;const f=()=>{n.removeEventListener(l,m),s()},m=g=>{g.target===n&&++h>=c&&f()};setTimeout(()=>{h<c&&f()},a+1),n.addEventListener(l,m)}function jS(n,e){const t=window.getComputedStyle(n),r=b=>(t[b]||"").split(", "),i=r(`${Ur}Delay`),s=r(`${Ur}Duration`),o=vg(i,s),a=r(`${$o}Delay`),c=r(`${$o}Duration`),l=vg(a,c);let h=null,f=0,m=0;e===Ur?o>0&&(h=Ur,f=o,m=s.length):e===$o?l>0&&(h=$o,f=l,m=c.length):(f=Math.max(o,l),h=f>0?o>l?Ur:$o:null,m=h?h===Ur?s.length:c.length:0);const g=h===Ur&&/\b(?:transform|all)(?:,|$)/.test(r(`${Ur}Property`).toString());return{type:h,timeout:f,propCount:m,hasTransform:g}}function vg(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,r)=>Eg(t)+Eg(n[r])))}function Eg(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function Tg(n){return(n?n.ownerDocument:document).body.offsetHeight}function GS(n,e,t){const r=n[Fa];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Du=Symbol("_vod"),wv=Symbol("_vsh"),RU={name:"show",beforeMount(n,{value:e},{transition:t}){n[Du]=n.style.display==="none"?"":n.style.display,t&&e?t.beforeEnter(n):zo(n,e)},mounted(n,{value:e},{transition:t}){t&&e&&t.enter(n)},updated(n,{value:e,oldValue:t},{transition:r}){!e!=!t&&(r?e?(r.beforeEnter(n),zo(n,!0),r.enter(n)):r.leave(n,()=>{zo(n,!1)}):zo(n,e))},beforeUnmount(n,{value:e}){zo(n,e)}};function zo(n,e){n.style.display=e?n[Du]:"none",n[wv]=!e}const KS=Symbol(""),$S=/(?:^|;)\s*display\s*:/;function zS(n,e,t){const r=n.style,i=$e(t);let s=!1;if(t&&!i){if(e)if($e(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&ra(r,a,"")}else for(const o in e)t[o]==null&&ra(r,o,"");for(const o in t){o==="display"&&(s=!0);const a=t[o];a!=null?WS(n,o,!$e(e)&&e?e[o]:void 0,a)||ra(r,o,a):ra(r,o,"")}}else if(i){if(e!==t){const o=r[KS];o&&(t+=";"+o),r.cssText=t,s=$S.test(t)}}else e&&n.removeAttribute("style");Du in n&&(n[Du]=s?r.display:"",n[wv]&&(r.display="none"))}const wg=/\s*!important$/;function ra(n,e,t){if(le(t))t.forEach(r=>ra(n,e,r));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const r=HS(n,e);wg.test(t)?n.setProperty(_i(r),t.replace(wg,""),"important"):n[r]=t}}const Ag=["Webkit","Moz","ms"],Ph={};function HS(n,e){const t=Ph[e];if(t)return t;let r=Jt(e);if(r!=="filter"&&r in n)return Ph[e]=r;r=sl(r);for(let i=0;i<Ag.length;i++){const s=Ag[i]+r;if(s in n)return Ph[e]=s}return e}function WS(n,e,t,r){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&$e(r)&&t===r}const bg="http://www.w3.org/1999/xlink";function Rg(n,e,t,r,i,s=qb(e)){r&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(bg,e.slice(6,e.length)):n.setAttributeNS(bg,e,t):t==null||s&&!cI(t)?n.removeAttribute(e):n.setAttribute(e,s?"":pn(t)?String(t):t)}function Sg(n,e,t,r,i){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Ev(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?n.getAttribute("value")||"":n.value,c=t==null?n.type==="checkbox"?"on":"":String(t);(a!==c||!("_value"in n))&&(n.value=c),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=cI(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(i||e)}function ar(n,e,t,r){n.addEventListener(e,t,r)}function QS(n,e,t,r){n.removeEventListener(e,t,r)}const Pg=Symbol("_vei");function JS(n,e,t,r,i=null){const s=n[Pg]||(n[Pg]={}),o=s[e];if(r&&o)o.value=r;else{const[a,c]=YS(e);if(r){const l=s[e]=eP(r,i);ar(n,a,l,c)}else o&&(QS(n,a,o,c),s[e]=void 0)}}const Cg=/(?:Once|Passive|Capture)$/;function YS(n){let e;if(Cg.test(n)){e={};let r;for(;r=n.match(Cg);)n=n.slice(0,n.length-r[0].length),e[r[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):_i(n.slice(2)),e]}let Ch=0;const XS=Promise.resolve(),ZS=()=>Ch||(XS.then(()=>Ch=0),Ch=Date.now());function eP(n,e){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;kn(tP(r,t.value),e,5,[r])};return t.value=n,t.attached=ZS(),t}function tP(n,e){if(le(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(r=>i=>!i._stopped&&r&&r(i))}else return e}const Dg=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,nP=(n,e,t,r,i,s)=>{const o=i==="svg";e==="class"?GS(n,r,o):e==="style"?zS(n,t,r):tl(e)?nl(e)||JS(n,e,t,r,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):rP(n,e,r,o))?(Sg(n,e,r),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Rg(n,e,r,o,s,e!=="value")):n._isVueCE&&(iP(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!$e(r)))?Sg(n,Jt(e),r,s,e):(e==="true-value"?n._trueValue=r:e==="false-value"&&(n._falseValue=r),Rg(n,e,r,o))};function rP(n,e,t,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in n&&Dg(e)&&_e(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=n.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Dg(e)&&$e(t)?!1:e in n}function iP(n,e){const t=n._def.props;if(!t)return!1;const r=Jt(e);return Array.isArray(t)?t.some(i=>Jt(i)===r):Object.keys(t).some(i=>Jt(i)===r)}const si=n=>{const e=n.props["onUpdate:modelValue"]||!1;return le(e)?t=>ou(e,t):e};function sP(n){n.target.composing=!0}function kg(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const wn=Symbol("_assign");function Ng(n,e,t){return e&&(n=n.trim()),t&&(n=ol(n)),n}const Vg={created(n,{modifiers:{lazy:e,trim:t,number:r}},i){n[wn]=si(i);const s=r||i.props&&i.props.type==="number";ar(n,e?"change":"input",o=>{o.target.composing||n[wn](Ng(n.value,t,s))}),(t||s)&&ar(n,"change",()=>{n.value=Ng(n.value,t,s)}),e||(ar(n,"compositionstart",sP),ar(n,"compositionend",kg),ar(n,"change",kg))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:r,trim:i,number:s}},o){if(n[wn]=si(o),n.composing)return;const a=(s||n.type==="number")&&!/^0\d/.test(n.value)?ol(n.value):n.value,c=e??"";if(a===c)return;const l=n.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===n&&n.type!=="range"&&(r&&e===t||i&&n.value.trim()===c)||(n.value=c)}},oP={deep:!0,created(n,e,t){n[wn]=si(t),ar(n,"change",()=>{const r=n._modelValue,i=$s(n),s=n.checked,o=n[wn];if(le(r)){const a=rf(r,i),c=a!==-1;if(s&&!c)o(r.concat(i));else if(!s&&c){const l=[...r];l.splice(a,1),o(l)}}else if(lo(r)){const a=new Set(r);s?a.add(i):a.delete(i),o(a)}else o(Av(n,s))})},mounted:Og,beforeUpdate(n,e,t){n[wn]=si(t),Og(n,e,t)}};function Og(n,{value:e,oldValue:t},r){n._modelValue=e;let i;if(le(e))i=rf(e,r.props.value)>-1;else if(lo(e))i=e.has(r.props.value);else{if(e===t)return;i=ri(e,Av(n,!0))}n.checked!==i&&(n.checked=i)}const aP={created(n,{value:e},t){n.checked=ri(e,t.props.value),n[wn]=si(t),ar(n,"change",()=>{n[wn]($s(n))})},beforeUpdate(n,{value:e,oldValue:t},r){n[wn]=si(r),e!==t&&(n.checked=ri(e,r.props.value))}},cP={deep:!0,created(n,{value:e,modifiers:{number:t}},r){const i=lo(e);ar(n,"change",()=>{const s=Array.prototype.filter.call(n.options,o=>o.selected).map(o=>t?ol($s(o)):$s(o));n[wn](n.multiple?i?new Set(s):s:s[0]),n._assigning=!0,hl(()=>{n._assigning=!1})}),n[wn]=si(r)},mounted(n,{value:e}){xg(n,e)},beforeUpdate(n,e,t){n[wn]=si(t)},updated(n,{value:e}){n._assigning||xg(n,e)}};function xg(n,e){const t=n.multiple,r=le(e);if(!(t&&!r&&!lo(e))){for(let i=0,s=n.options.length;i<s;i++){const o=n.options[i],a=$s(o);if(t)if(r){const c=typeof a;c==="string"||c==="number"?o.selected=e.some(l=>String(l)===String(a)):o.selected=rf(e,a)>-1}else o.selected=e.has(a);else if(ri($s(o),e)){n.selectedIndex!==i&&(n.selectedIndex=i);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function $s(n){return"_value"in n?n._value:n.value}function Av(n,e){const t=e?"_trueValue":"_falseValue";return t in n?n[t]:e}const SU={created(n,e,t){Wc(n,e,t,null,"created")},mounted(n,e,t){Wc(n,e,t,null,"mounted")},beforeUpdate(n,e,t,r){Wc(n,e,t,r,"beforeUpdate")},updated(n,e,t,r){Wc(n,e,t,r,"updated")}};function uP(n,e){switch(n){case"SELECT":return cP;case"TEXTAREA":return Vg;default:switch(e){case"checkbox":return oP;case"radio":return aP;default:return Vg}}}function Wc(n,e,t,r,i){const o=uP(n.tagName,t.props&&t.props.type)[i];o&&o(n,e,t,r)}const lP=["ctrl","shift","alt","meta"],hP={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>lP.some(t=>n[`${t}Key`]&&!e.includes(t))},PU=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),r=e.join(".");return t[r]||(t[r]=((i,...s)=>{for(let o=0;o<e.length;o++){const a=hP[e[o]];if(a&&a(i,e))return}return n(i,...s)}))},dP={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},CU=(n,e)=>{const t=n._withKeys||(n._withKeys={}),r=e.join(".");return t[r]||(t[r]=(i=>{if(!("key"in i))return;const s=_i(i.key);if(e.some(o=>o===s||dP[o]===s))return n(i)}))},fP=It({patchProp:nP},xS);let Lg;function pP(){return Lg||(Lg=dS(fP))}const mP=((...n)=>{const e=pP().createApp(...n),{mount:t}=e;return e.mount=r=>{const i=_P(r);if(!i)return;const s=e._component;!_e(s)&&!s.render&&!s.template&&(s.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=t(i,!1,gP(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e});function gP(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function _P(n){return $e(n)?document.querySelector(n):n}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let bv;const _l=n=>bv=n,Rv=Symbol();function _d(n){return n&&typeof n=="object"&&Object.prototype.toString.call(n)==="[object Object]"&&typeof n.toJSON!="function"}var ya;(function(n){n.direct="direct",n.patchObject="patch object",n.patchFunction="patch function"})(ya||(ya={}));function yP(){const n=dI(!0),e=n.run(()=>un({}));let t=[],r=[];const i=hf({install(s){_l(i),i._a=s,s.provide(Rv,i),s.config.globalProperties.$pinia=i,r.forEach(o=>t.push(o)),r=[]},use(s){return this._a?t.push(s):r.push(s),this},_p:t,_a:null,_e:n,_s:new Map,state:e});return i}const Sv=()=>{};function Mg(n,e,t,r=Sv){n.push(e);const i=()=>{const s=n.indexOf(e);s>-1&&(n.splice(s,1),r())};return!t&&fI()&&Kb(i),i}function Es(n,...e){n.slice().forEach(t=>{t(...e)})}const IP=n=>n(),Fg=Symbol(),Dh=Symbol();function yd(n,e){n instanceof Map&&e instanceof Map?e.forEach((t,r)=>n.set(r,t)):n instanceof Set&&e instanceof Set&&e.forEach(n.add,n);for(const t in e){if(!e.hasOwnProperty(t))continue;const r=e[t],i=n[t];_d(i)&&_d(r)&&n.hasOwnProperty(t)&&!it(r)&&!gr(r)?n[t]=yd(i,r):n[t]=r}return n}const vP=Symbol();function EP(n){return!_d(n)||!n.hasOwnProperty(vP)}const{assign:$r}=Object;function TP(n){return!!(it(n)&&n.effect)}function wP(n,e,t,r){const{state:i,actions:s,getters:o}=e,a=t.state.value[n];let c;function l(){a||(t.state.value[n]=i?i():{});const h=fR(t.state.value[n]);return $r(h,s,Object.keys(o||{}).reduce((f,m)=>(f[m]=hf(Dt(()=>{_l(t);const g=t._s.get(n);return o[m].call(g,g)})),f),{}))}return c=Pv(n,l,e,t,r,!0),c}function Pv(n,e,t={},r,i,s){let o;const a=$r({actions:{}},t),c={deep:!0};let l,h,f=[],m=[],g;const b=r.state.value[n];!s&&!b&&(r.state.value[n]={});let R;function C(_){let y;l=h=!1,typeof _=="function"?(_(r.state.value[n]),y={type:ya.patchFunction,storeId:n,events:g}):(yd(r.state.value[n],_),y={type:ya.patchObject,payload:_,storeId:n,events:g});const v=R=Symbol();hl().then(()=>{R===v&&(l=!0)}),h=!0,Es(f,y,r.state.value[n])}const V=s?function(){const{state:y}=t,v=y?y():{};this.$patch(P=>{$r(P,v)})}:Sv;function D(){o.stop(),f=[],m=[],r._s.delete(n)}const x=(_,y="")=>{if(Fg in _)return _[Dh]=y,_;const v=function(){_l(r);const P=Array.from(arguments),A=[],T=[];function Se(pe){A.push(pe)}function ut(pe){T.push(pe)}Es(m,{args:P,name:v[Dh],store:H,after:Se,onError:ut});let Oe;try{Oe=_.apply(this&&this.$id===n?this:H,P)}catch(pe){throw Es(T,pe),pe}return Oe instanceof Promise?Oe.then(pe=>(Es(A,pe),pe)).catch(pe=>(Es(T,pe),Promise.reject(pe))):(Es(A,Oe),Oe)};return v[Fg]=!0,v[Dh]=y,v},M={_p:r,$id:n,$onAction:Mg.bind(null,m),$patch:C,$reset:V,$subscribe(_,y={}){const v=Mg(f,_,y.detached,()=>P()),P=o.run(()=>Ms(()=>r.state.value[n],A=>{(y.flush==="sync"?h:l)&&_({storeId:n,type:ya.direct,events:g},A)},$r({},c,y)));return v},$dispose:D},H=ic(M);r._s.set(n,H);const E=(r._a&&r._a.runWithContext||IP)(()=>r._e.run(()=>(o=dI()).run(()=>e({action:x}))));for(const _ in E){const y=E[_];if(it(y)&&!TP(y)||gr(y))s||(b&&EP(y)&&(it(y)?y.value=b[_]:yd(y,b[_])),r.state.value[n][_]=y);else if(typeof y=="function"){const v=x(y,_);E[_]=v,a.actions[_]=y}}return $r(H,E),$r(Pe(H),E),Object.defineProperty(H,"$state",{get:()=>r.state.value[n],set:_=>{C(y=>{$r(y,_)})}}),r._p.forEach(_=>{$r(H,o.run(()=>_({store:H,app:r._a,pinia:r,options:a})))}),b&&s&&t.hydrate&&t.hydrate(H.$state,b),l=!0,h=!0,H}/*! #__NO_SIDE_EFFECTS__ */function vf(n,e,t){let r,i;const s=typeof e=="function";typeof n=="string"?(r=n,i=s?t:e):(i=n,r=n.id);function o(a,c){const l=wR();return a=a||(l?Tn(Rv,null):null),a&&_l(a),a=bv,a._s.has(r)||(s?Pv(r,e,i,a):wP(r,i,a)),a._s.get(r)}return o.$id=r,o}var Ug={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cv=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},AP=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Dv={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,l=c?n[i+2]:0,h=s>>2,f=(s&3)<<4|a>>4;let m=(a&15)<<2|l>>6,g=l&63;c||(g=64,o||(m=64)),r.push(t[h],t[f],t[m],t[g])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Cv(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):AP(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const l=i<n.length?t[n.charAt(i)]:64;++i;const f=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||l==null||f==null)throw new bP;const m=s<<2|a>>4;if(r.push(m),l!==64){const g=a<<4&240|l>>2;if(r.push(g),f!==64){const b=l<<6&192|f;r.push(b)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class bP extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const RP=function(n){const e=Cv(n);return Dv.encodeByteArray(e,!0)},ku=function(n){return RP(n).replace(/\./g,"")},kv=function(n){try{return Dv.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function SP(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const PP=()=>SP().__FIREBASE_DEFAULTS__,CP=()=>{if(typeof process>"u"||typeof Ug>"u")return;const n=Ug.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},DP=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&kv(n[1]);return e&&JSON.parse(e)},yl=()=>{try{return PP()||CP()||DP()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Nv=n=>{var e,t;return(t=(e=yl())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Vv=n=>{const e=Nv(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ov=()=>{var n;return(n=yl())===null||n===void 0?void 0:n.config},xv=n=>{var e;return(e=yl())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kP{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function Lv(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[ku(JSON.stringify(t)),ku(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function NP(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(vt())}function VP(){var n;const e=(n=yl())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function OP(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function xP(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function LP(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function MP(){const n=vt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Mv(){return!VP()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Fv(){try{return typeof indexedDB=="object"}catch{return!1}}function FP(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UP="FirebaseError";class Yn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=UP,Object.setPrototypeOf(this,Yn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ac.prototype.create)}}class ac{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?BP(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Yn(i,a,r)}}function BP(n,e){return n.replace(qP,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const qP=/\{\$([^}]+)}/g;function jP(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function oi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(Bg(s)&&Bg(o)){if(!oi(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Bg(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ho(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ia(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function sa(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function GP(n,e){const t=new KP(n,e);return t.subscribe.bind(t)}class KP{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");$P(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=kh),i.error===void 0&&(i.error=kh),i.complete===void 0&&(i.complete=kh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function $P(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function kh(){}/**
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
 */class zP{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new kP;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(WP(e))try{this.getOrInitializeService({instanceIdentifier:Li})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Li){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Li){return this.instances.has(e)}getOptions(e=Li){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:HP(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Li){return this.component?this.component.multipleInstances?e:Li:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function HP(n){return n===Li?void 0:n}function WP(n){return n.instantiationMode==="EAGER"}/**
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
 */class QP{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new zP(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var we;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(we||(we={}));const JP={debug:we.DEBUG,verbose:we.VERBOSE,info:we.INFO,warn:we.WARN,error:we.ERROR,silent:we.SILENT},YP=we.INFO,XP={[we.DEBUG]:"log",[we.VERBOSE]:"log",[we.INFO]:"info",[we.WARN]:"warn",[we.ERROR]:"error"},ZP=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=XP[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ef{constructor(e){this.name=e,this._logLevel=YP,this._logHandler=ZP,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in we))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?JP[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,we.DEBUG,...e),this._logHandler(this,we.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,we.VERBOSE,...e),this._logHandler(this,we.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,we.INFO,...e),this._logHandler(this,we.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,we.WARN,...e),this._logHandler(this,we.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,we.ERROR,...e),this._logHandler(this,we.ERROR,...e)}}const e0=(n,e)=>e.some(t=>n instanceof t);let qg,jg;function t0(){return qg||(qg=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function n0(){return jg||(jg=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Uv=new WeakMap,Id=new WeakMap,Bv=new WeakMap,Nh=new WeakMap,Tf=new WeakMap;function r0(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(ei(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Uv.set(t,n)}).catch(()=>{}),Tf.set(e,n),e}function i0(n){if(Id.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Id.set(n,e)}let vd={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Id.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Bv.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ei(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function s0(n){vd=n(vd)}function o0(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Vh(this),e,...t);return Bv.set(r,e.sort?e.sort():[e]),ei(r)}:n0().includes(n)?function(...e){return n.apply(Vh(this),e),ei(Uv.get(this))}:function(...e){return ei(n.apply(Vh(this),e))}}function a0(n){return typeof n=="function"?o0(n):(n instanceof IDBTransaction&&i0(n),e0(n,t0())?new Proxy(n,vd):n)}function ei(n){if(n instanceof IDBRequest)return r0(n);if(Nh.has(n))return Nh.get(n);const e=a0(n);return e!==n&&(Nh.set(n,e),Tf.set(e,n)),e}const Vh=n=>Tf.get(n);function c0(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),a=ei(o);return r&&o.addEventListener("upgradeneeded",c=>{r(ei(o.result),c.oldVersion,c.newVersion,ei(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const u0=["get","getKey","getAll","getAllKeys","count"],l0=["put","add","delete","clear"],Oh=new Map;function Gg(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Oh.get(e))return Oh.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=l0.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||u0.includes(t)))return;const s=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),i&&c.done]))[0]};return Oh.set(e,s),s}s0(n=>({...n,get:(e,t,r)=>Gg(e,t)||n.get(e,t,r),has:(e,t)=>!!Gg(e,t)||n.has(e,t)}));/**
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
 */class h0{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(d0(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function d0(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ed="@firebase/app",Kg="0.10.13";/**
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
 */const Er=new Ef("@firebase/app"),f0="@firebase/app-compat",p0="@firebase/analytics-compat",m0="@firebase/analytics",g0="@firebase/app-check-compat",_0="@firebase/app-check",y0="@firebase/auth",I0="@firebase/auth-compat",v0="@firebase/database",E0="@firebase/data-connect",T0="@firebase/database-compat",w0="@firebase/functions",A0="@firebase/functions-compat",b0="@firebase/installations",R0="@firebase/installations-compat",S0="@firebase/messaging",P0="@firebase/messaging-compat",C0="@firebase/performance",D0="@firebase/performance-compat",k0="@firebase/remote-config",N0="@firebase/remote-config-compat",V0="@firebase/storage",O0="@firebase/storage-compat",x0="@firebase/firestore",L0="@firebase/vertexai-preview",M0="@firebase/firestore-compat",F0="firebase",U0="10.14.1";/**
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
 */const Nu="[DEFAULT]",B0={[Ed]:"fire-core",[f0]:"fire-core-compat",[m0]:"fire-analytics",[p0]:"fire-analytics-compat",[_0]:"fire-app-check",[g0]:"fire-app-check-compat",[y0]:"fire-auth",[I0]:"fire-auth-compat",[v0]:"fire-rtdb",[E0]:"fire-data-connect",[T0]:"fire-rtdb-compat",[w0]:"fire-fn",[A0]:"fire-fn-compat",[b0]:"fire-iid",[R0]:"fire-iid-compat",[S0]:"fire-fcm",[P0]:"fire-fcm-compat",[C0]:"fire-perf",[D0]:"fire-perf-compat",[k0]:"fire-rc",[N0]:"fire-rc-compat",[V0]:"fire-gcs",[O0]:"fire-gcs-compat",[x0]:"fire-fst",[M0]:"fire-fst-compat",[L0]:"fire-vertex","fire-js":"fire-js",[F0]:"fire-js-all"};/**
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
 */const Vu=new Map,q0=new Map,Td=new Map;function $g(n,e){try{n.container.addComponent(e)}catch(t){Er.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Zi(n){const e=n.name;if(Td.has(e))return Er.debug(`There were multiple attempts to register component ${e}.`),!1;Td.set(e,n);for(const t of Vu.values())$g(t,n);for(const t of q0.values())$g(t,n);return!0}function fo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function j0(n,e,t=Nu){fo(n,e).clearInstance(t)}function ht(n){return n.settings!==void 0}/**
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
 */const G0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ti=new ac("app","Firebase",G0);/**
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
 */class K0{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ai("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ti.create("app-deleted",{appName:this._name})}}/**
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
 */const ls=U0;function wf(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Nu,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw ti.create("bad-app-name",{appName:String(i)});if(t||(t=Ov()),!t)throw ti.create("no-options");const s=Vu.get(i);if(s){if(oi(t,s.options)&&oi(r,s.config))return s;throw ti.create("duplicate-app",{appName:i})}const o=new QP(i);for(const c of Td.values())o.addComponent(c);const a=new K0(t,r,o);return Vu.set(i,a),a}function Il(n=Nu){const e=Vu.get(n);if(!e&&n===Nu&&Ov())return wf();if(!e)throw ti.create("no-app",{appName:n});return e}function zn(n,e,t){var r;let i=(r=B0[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Er.warn(a.join(" "));return}Zi(new ai(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const $0="firebase-heartbeat-database",z0=1,Ua="firebase-heartbeat-store";let xh=null;function qv(){return xh||(xh=c0($0,z0,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Ua)}catch(t){console.warn(t)}}}}).catch(n=>{throw ti.create("idb-open",{originalErrorMessage:n.message})})),xh}async function H0(n){try{const t=(await qv()).transaction(Ua),r=await t.objectStore(Ua).get(jv(n));return await t.done,r}catch(e){if(e instanceof Yn)Er.warn(e.message);else{const t=ti.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Er.warn(t.message)}}}async function zg(n,e){try{const r=(await qv()).transaction(Ua,"readwrite");await r.objectStore(Ua).put(e,jv(n)),await r.done}catch(t){if(t instanceof Yn)Er.warn(t.message);else{const r=ti.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Er.warn(r.message)}}}function jv(n){return`${n.name}!${n.options.appId}`}/**
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
 */const W0=1024,Q0=720*60*60*1e3;class J0{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new X0(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Hg();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Q0}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Er.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Hg(),{heartbeatsToSend:r,unsentEntries:i}=Y0(this._heartbeatsCache.heartbeats),s=ku(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Er.warn(t),""}}}function Hg(){return new Date().toISOString().substring(0,10)}function Y0(n,e=W0){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Wg(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Wg(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class X0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Fv()?FP().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await H0(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return zg(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return zg(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Wg(n){return ku(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Z0(n){Zi(new ai("platform-logger",e=>new h0(e),"PRIVATE")),Zi(new ai("heartbeat",e=>new J0(e),"PRIVATE")),zn(Ed,Kg,n),zn(Ed,Kg,"esm2017"),zn("fire-js","")}Z0("");var Qg=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qi,Gv;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function y(){}y.prototype=_.prototype,E.D=_.prototype,E.prototype=new y,E.prototype.constructor=E,E.C=function(v,P,A){for(var T=Array(arguments.length-2),Se=2;Se<arguments.length;Se++)T[Se-2]=arguments[Se];return _.prototype[P].apply(v,T)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,_,y){y||(y=0);var v=Array(16);if(typeof _=="string")for(var P=0;16>P;++P)v[P]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(P=0;16>P;++P)v[P]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=E.g[0],y=E.g[1],P=E.g[2];var A=E.g[3],T=_+(A^y&(P^A))+v[0]+3614090360&4294967295;_=y+(T<<7&4294967295|T>>>25),T=A+(P^_&(y^P))+v[1]+3905402710&4294967295,A=_+(T<<12&4294967295|T>>>20),T=P+(y^A&(_^y))+v[2]+606105819&4294967295,P=A+(T<<17&4294967295|T>>>15),T=y+(_^P&(A^_))+v[3]+3250441966&4294967295,y=P+(T<<22&4294967295|T>>>10),T=_+(A^y&(P^A))+v[4]+4118548399&4294967295,_=y+(T<<7&4294967295|T>>>25),T=A+(P^_&(y^P))+v[5]+1200080426&4294967295,A=_+(T<<12&4294967295|T>>>20),T=P+(y^A&(_^y))+v[6]+2821735955&4294967295,P=A+(T<<17&4294967295|T>>>15),T=y+(_^P&(A^_))+v[7]+4249261313&4294967295,y=P+(T<<22&4294967295|T>>>10),T=_+(A^y&(P^A))+v[8]+1770035416&4294967295,_=y+(T<<7&4294967295|T>>>25),T=A+(P^_&(y^P))+v[9]+2336552879&4294967295,A=_+(T<<12&4294967295|T>>>20),T=P+(y^A&(_^y))+v[10]+4294925233&4294967295,P=A+(T<<17&4294967295|T>>>15),T=y+(_^P&(A^_))+v[11]+2304563134&4294967295,y=P+(T<<22&4294967295|T>>>10),T=_+(A^y&(P^A))+v[12]+1804603682&4294967295,_=y+(T<<7&4294967295|T>>>25),T=A+(P^_&(y^P))+v[13]+4254626195&4294967295,A=_+(T<<12&4294967295|T>>>20),T=P+(y^A&(_^y))+v[14]+2792965006&4294967295,P=A+(T<<17&4294967295|T>>>15),T=y+(_^P&(A^_))+v[15]+1236535329&4294967295,y=P+(T<<22&4294967295|T>>>10),T=_+(P^A&(y^P))+v[1]+4129170786&4294967295,_=y+(T<<5&4294967295|T>>>27),T=A+(y^P&(_^y))+v[6]+3225465664&4294967295,A=_+(T<<9&4294967295|T>>>23),T=P+(_^y&(A^_))+v[11]+643717713&4294967295,P=A+(T<<14&4294967295|T>>>18),T=y+(A^_&(P^A))+v[0]+3921069994&4294967295,y=P+(T<<20&4294967295|T>>>12),T=_+(P^A&(y^P))+v[5]+3593408605&4294967295,_=y+(T<<5&4294967295|T>>>27),T=A+(y^P&(_^y))+v[10]+38016083&4294967295,A=_+(T<<9&4294967295|T>>>23),T=P+(_^y&(A^_))+v[15]+3634488961&4294967295,P=A+(T<<14&4294967295|T>>>18),T=y+(A^_&(P^A))+v[4]+3889429448&4294967295,y=P+(T<<20&4294967295|T>>>12),T=_+(P^A&(y^P))+v[9]+568446438&4294967295,_=y+(T<<5&4294967295|T>>>27),T=A+(y^P&(_^y))+v[14]+3275163606&4294967295,A=_+(T<<9&4294967295|T>>>23),T=P+(_^y&(A^_))+v[3]+4107603335&4294967295,P=A+(T<<14&4294967295|T>>>18),T=y+(A^_&(P^A))+v[8]+1163531501&4294967295,y=P+(T<<20&4294967295|T>>>12),T=_+(P^A&(y^P))+v[13]+2850285829&4294967295,_=y+(T<<5&4294967295|T>>>27),T=A+(y^P&(_^y))+v[2]+4243563512&4294967295,A=_+(T<<9&4294967295|T>>>23),T=P+(_^y&(A^_))+v[7]+1735328473&4294967295,P=A+(T<<14&4294967295|T>>>18),T=y+(A^_&(P^A))+v[12]+2368359562&4294967295,y=P+(T<<20&4294967295|T>>>12),T=_+(y^P^A)+v[5]+4294588738&4294967295,_=y+(T<<4&4294967295|T>>>28),T=A+(_^y^P)+v[8]+2272392833&4294967295,A=_+(T<<11&4294967295|T>>>21),T=P+(A^_^y)+v[11]+1839030562&4294967295,P=A+(T<<16&4294967295|T>>>16),T=y+(P^A^_)+v[14]+4259657740&4294967295,y=P+(T<<23&4294967295|T>>>9),T=_+(y^P^A)+v[1]+2763975236&4294967295,_=y+(T<<4&4294967295|T>>>28),T=A+(_^y^P)+v[4]+1272893353&4294967295,A=_+(T<<11&4294967295|T>>>21),T=P+(A^_^y)+v[7]+4139469664&4294967295,P=A+(T<<16&4294967295|T>>>16),T=y+(P^A^_)+v[10]+3200236656&4294967295,y=P+(T<<23&4294967295|T>>>9),T=_+(y^P^A)+v[13]+681279174&4294967295,_=y+(T<<4&4294967295|T>>>28),T=A+(_^y^P)+v[0]+3936430074&4294967295,A=_+(T<<11&4294967295|T>>>21),T=P+(A^_^y)+v[3]+3572445317&4294967295,P=A+(T<<16&4294967295|T>>>16),T=y+(P^A^_)+v[6]+76029189&4294967295,y=P+(T<<23&4294967295|T>>>9),T=_+(y^P^A)+v[9]+3654602809&4294967295,_=y+(T<<4&4294967295|T>>>28),T=A+(_^y^P)+v[12]+3873151461&4294967295,A=_+(T<<11&4294967295|T>>>21),T=P+(A^_^y)+v[15]+530742520&4294967295,P=A+(T<<16&4294967295|T>>>16),T=y+(P^A^_)+v[2]+3299628645&4294967295,y=P+(T<<23&4294967295|T>>>9),T=_+(P^(y|~A))+v[0]+4096336452&4294967295,_=y+(T<<6&4294967295|T>>>26),T=A+(y^(_|~P))+v[7]+1126891415&4294967295,A=_+(T<<10&4294967295|T>>>22),T=P+(_^(A|~y))+v[14]+2878612391&4294967295,P=A+(T<<15&4294967295|T>>>17),T=y+(A^(P|~_))+v[5]+4237533241&4294967295,y=P+(T<<21&4294967295|T>>>11),T=_+(P^(y|~A))+v[12]+1700485571&4294967295,_=y+(T<<6&4294967295|T>>>26),T=A+(y^(_|~P))+v[3]+2399980690&4294967295,A=_+(T<<10&4294967295|T>>>22),T=P+(_^(A|~y))+v[10]+4293915773&4294967295,P=A+(T<<15&4294967295|T>>>17),T=y+(A^(P|~_))+v[1]+2240044497&4294967295,y=P+(T<<21&4294967295|T>>>11),T=_+(P^(y|~A))+v[8]+1873313359&4294967295,_=y+(T<<6&4294967295|T>>>26),T=A+(y^(_|~P))+v[15]+4264355552&4294967295,A=_+(T<<10&4294967295|T>>>22),T=P+(_^(A|~y))+v[6]+2734768916&4294967295,P=A+(T<<15&4294967295|T>>>17),T=y+(A^(P|~_))+v[13]+1309151649&4294967295,y=P+(T<<21&4294967295|T>>>11),T=_+(P^(y|~A))+v[4]+4149444226&4294967295,_=y+(T<<6&4294967295|T>>>26),T=A+(y^(_|~P))+v[11]+3174756917&4294967295,A=_+(T<<10&4294967295|T>>>22),T=P+(_^(A|~y))+v[2]+718787259&4294967295,P=A+(T<<15&4294967295|T>>>17),T=y+(A^(P|~_))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(P+(T<<21&4294967295|T>>>11))&4294967295,E.g[2]=E.g[2]+P&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var y=_-this.blockSize,v=this.B,P=this.h,A=0;A<_;){if(P==0)for(;A<=y;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<_;)if(v[P++]=E.charCodeAt(A++),P==this.blockSize){i(this,v),P=0;break}}else for(;A<_;)if(v[P++]=E[A++],P==this.blockSize){i(this,v),P=0;break}}this.h=P,this.o+=_},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var y=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=y&255,y/=256;for(this.u(E),E=Array(16),_=y=0;4>_;++_)for(var v=0;32>v;v+=8)E[y++]=this.g[_]>>>v&255;return E};function s(E,_){var y=a;return Object.prototype.hasOwnProperty.call(y,E)?y[E]:y[E]=_(E)}function o(E,_){this.h=_;for(var y=[],v=!0,P=E.length-1;0<=P;P--){var A=E[P]|0;v&&A==_||(y[P]=A,v=!1)}this.g=y}var a={};function c(E){return-128<=E&&128>E?s(E,function(_){return new o([_|0],0>_?-1:0)}):new o([E|0],0>E?-1:0)}function l(E){if(isNaN(E)||!isFinite(E))return f;if(0>E)return C(l(-E));for(var _=[],y=1,v=0;E>=y;v++)_[v]=E/y|0,y*=4294967296;return new o(_,0)}function h(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return C(h(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=l(Math.pow(_,8)),v=f,P=0;P<E.length;P+=8){var A=Math.min(8,E.length-P),T=parseInt(E.substring(P,P+A),_);8>A?(A=l(Math.pow(_,A)),v=v.j(A).add(l(T))):(v=v.j(y),v=v.add(l(T)))}return v}var f=c(0),m=c(1),g=c(16777216);n=o.prototype,n.m=function(){if(R(this))return-C(this).m();for(var E=0,_=1,y=0;y<this.g.length;y++){var v=this.i(y);E+=(0<=v?v:4294967296+v)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(b(this))return"0";if(R(this))return"-"+C(this).toString(E);for(var _=l(Math.pow(E,6)),y=this,v="";;){var P=M(y,_).g;y=V(y,P.j(_));var A=((0<y.g.length?y.g[0]:y.h)>>>0).toString(E);if(y=P,b(y))return A+v;for(;6>A.length;)A="0"+A;v=A+v}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function b(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function R(E){return E.h==-1}n.l=function(E){return E=V(this,E),R(E)?-1:b(E)?0:1};function C(E){for(var _=E.g.length,y=[],v=0;v<_;v++)y[v]=~E.g[v];return new o(y,~E.h).add(m)}n.abs=function(){return R(this)?C(this):this},n.add=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0,P=0;P<=_;P++){var A=v+(this.i(P)&65535)+(E.i(P)&65535),T=(A>>>16)+(this.i(P)>>>16)+(E.i(P)>>>16);v=T>>>16,A&=65535,T&=65535,y[P]=T<<16|A}return new o(y,y[y.length-1]&-2147483648?-1:0)};function V(E,_){return E.add(C(_))}n.j=function(E){if(b(this)||b(E))return f;if(R(this))return R(E)?C(this).j(C(E)):C(C(this).j(E));if(R(E))return C(this.j(C(E)));if(0>this.l(g)&&0>E.l(g))return l(this.m()*E.m());for(var _=this.g.length+E.g.length,y=[],v=0;v<2*_;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var P=0;P<E.g.length;P++){var A=this.i(v)>>>16,T=this.i(v)&65535,Se=E.i(P)>>>16,ut=E.i(P)&65535;y[2*v+2*P]+=T*ut,D(y,2*v+2*P),y[2*v+2*P+1]+=A*ut,D(y,2*v+2*P+1),y[2*v+2*P+1]+=T*Se,D(y,2*v+2*P+1),y[2*v+2*P+2]+=A*Se,D(y,2*v+2*P+2)}for(v=0;v<_;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=_;v<2*_;v++)y[v]=0;return new o(y,0)};function D(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function x(E,_){this.g=E,this.h=_}function M(E,_){if(b(_))throw Error("division by zero");if(b(E))return new x(f,f);if(R(E))return _=M(C(E),_),new x(C(_.g),C(_.h));if(R(_))return _=M(E,C(_)),new x(C(_.g),_.h);if(30<E.g.length){if(R(E)||R(_))throw Error("slowDivide_ only works with positive integers.");for(var y=m,v=_;0>=v.l(E);)y=H(y),v=H(v);var P=j(y,1),A=j(v,1);for(v=j(v,2),y=j(y,2);!b(v);){var T=A.add(v);0>=T.l(E)&&(P=P.add(y),A=T),v=j(v,1),y=j(y,1)}return _=V(E,P.j(_)),new x(P,_)}for(P=f;0<=E.l(_);){for(y=Math.max(1,Math.floor(E.m()/_.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),A=l(y),T=A.j(_);R(T)||0<T.l(E);)y-=v,A=l(y),T=A.j(_);b(A)&&(A=m),P=P.add(A),E=V(E,T)}return new x(P,E)}n.A=function(E){return M(this,E).h},n.and=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)&E.i(v);return new o(y,this.h&E.h)},n.or=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)|E.i(v);return new o(y,this.h|E.h)},n.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)^E.i(v);return new o(y,this.h^E.h)};function H(E){for(var _=E.g.length+1,y=[],v=0;v<_;v++)y[v]=E.i(v)<<1|E.i(v-1)>>>31;return new o(y,E.h)}function j(E,_){var y=_>>5;_%=32;for(var v=E.g.length-y,P=[],A=0;A<v;A++)P[A]=0<_?E.i(A+y)>>>_|E.i(A+y+1)<<32-_:E.i(A+y);return new o(P,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Gv=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=h,Qi=o}).apply(typeof Qg<"u"?Qg:typeof self<"u"?self:typeof window<"u"?window:{});var Qc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Kv,oa,$v,lu,wd,zv,Hv,Wv;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,d,p){return u==Array.prototype||u==Object.prototype||(u[d]=p.value),u};function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof Qc=="object"&&Qc];for(var d=0;d<u.length;++d){var p=u[d];if(p&&p.Math==Math)return p}throw Error("Cannot find global object")}var r=t(this);function i(u,d){if(d)e:{var p=r;u=u.split(".");for(var I=0;I<u.length-1;I++){var O=u[I];if(!(O in p))break e;p=p[O]}u=u[u.length-1],I=p[u],d=d(I),d!=I&&d!=null&&e(p,u,{configurable:!0,writable:!0,value:d})}}function s(u,d){u instanceof String&&(u+="");var p=0,I=!1,O={next:function(){if(!I&&p<u.length){var F=p++;return{value:d(F,u[F]),done:!1}}return I=!0,{done:!0,value:void 0}}};return O[Symbol.iterator]=function(){return O},O}i("Array.prototype.values",function(u){return u||function(){return s(this,function(d,p){return p})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function c(u){var d=typeof u;return d=d!="object"?d:u?Array.isArray(u)?"array":d:"null",d=="array"||d=="object"&&typeof u.length=="number"}function l(u){var d=typeof u;return d=="object"&&u!=null||d=="function"}function h(u,d,p){return u.call.apply(u.bind,arguments)}function f(u,d,p){if(!u)throw Error();if(2<arguments.length){var I=Array.prototype.slice.call(arguments,2);return function(){var O=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(O,I),u.apply(d,O)}}return function(){return u.apply(d,arguments)}}function m(u,d,p){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:f,m.apply(null,arguments)}function g(u,d){var p=Array.prototype.slice.call(arguments,1);return function(){var I=p.slice();return I.push.apply(I,arguments),u.apply(this,I)}}function b(u,d){function p(){}p.prototype=d.prototype,u.aa=d.prototype,u.prototype=new p,u.prototype.constructor=u,u.Qb=function(I,O,F){for(var Y=Array(arguments.length-2),Fe=2;Fe<arguments.length;Fe++)Y[Fe-2]=arguments[Fe];return d.prototype[O].apply(I,Y)}}function R(u){const d=u.length;if(0<d){const p=Array(d);for(let I=0;I<d;I++)p[I]=u[I];return p}return[]}function C(u,d){for(let p=1;p<arguments.length;p++){const I=arguments[p];if(c(I)){const O=u.length||0,F=I.length||0;u.length=O+F;for(let Y=0;Y<F;Y++)u[O+Y]=I[Y]}else u.push(I)}}class V{constructor(d,p){this.i=d,this.j=p,this.h=0,this.g=null}get(){let d;return 0<this.h?(this.h--,d=this.g,this.g=d.next,d.next=null):d=this.i(),d}}function D(u){return/^[\s\xa0]*$/.test(u)}function x(){var u=a.navigator;return u&&(u=u.userAgent)?u:""}function M(u){return M[" "](u),u}M[" "]=function(){};var H=x().indexOf("Gecko")!=-1&&!(x().toLowerCase().indexOf("webkit")!=-1&&x().indexOf("Edge")==-1)&&!(x().indexOf("Trident")!=-1||x().indexOf("MSIE")!=-1)&&x().indexOf("Edge")==-1;function j(u,d,p){for(const I in u)d.call(p,u[I],I,u)}function E(u,d){for(const p in u)d.call(void 0,u[p],p,u)}function _(u){const d={};for(const p in u)d[p]=u[p];return d}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(u,d){let p,I;for(let O=1;O<arguments.length;O++){I=arguments[O];for(p in I)u[p]=I[p];for(let F=0;F<y.length;F++)p=y[F],Object.prototype.hasOwnProperty.call(I,p)&&(u[p]=I[p])}}function P(u){var d=1;u=u.split(":");const p=[];for(;0<d&&u.length;)p.push(u.shift()),d--;return u.length&&p.push(u.join(":")),p}function A(u){a.setTimeout(()=>{throw u},0)}function T(){var u=rn;let d=null;return u.g&&(d=u.g,u.g=u.g.next,u.g||(u.h=null),d.next=null),d}class Se{constructor(){this.h=this.g=null}add(d,p){const I=ut.get();I.set(d,p),this.h?this.h.next=I:this.g=I,this.h=I}}var ut=new V(()=>new Oe,u=>u.reset());class Oe{constructor(){this.next=this.g=this.h=null}set(d,p){this.h=d,this.g=p,this.next=null}reset(){this.next=this.g=this.h=null}}let pe,Te=!1,rn=new Se,bn=()=>{const u=a.Promise.resolve(void 0);pe=()=>{u.then(_n)}};var _n=()=>{for(var u;u=T();){try{u.h.call(u.g)}catch(p){A(p)}var d=ut;d.j(u),100>d.h&&(d.h++,u.next=d.g,d.g=u)}Te=!1};function Xe(){this.s=this.s,this.C=this.C}Xe.prototype.s=!1,Xe.prototype.ma=function(){this.s||(this.s=!0,this.N())},Xe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ze(u,d){this.type=u,this.g=this.target=d,this.defaultPrevented=!1}Ze.prototype.h=function(){this.defaultPrevented=!0};var Or=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var u=!1,d=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const p=()=>{};a.addEventListener("test",p,d),a.removeEventListener("test",p,d)}catch{}return u})();function sn(u,d){if(Ze.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var p=this.type=u.type,I=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=d,d=u.relatedTarget){if(H){e:{try{M(d.nodeName);var O=!0;break e}catch{}O=!1}O||(d=null)}}else p=="mouseover"?d=u.fromElement:p=="mouseout"&&(d=u.toElement);this.relatedTarget=d,I?(this.clientX=I.clientX!==void 0?I.clientX:I.pageX,this.clientY=I.clientY!==void 0?I.clientY:I.pageY,this.screenX=I.screenX||0,this.screenY=I.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:Xt[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&sn.aa.h.call(this)}}b(sn,Ze);var Xt={2:"touch",3:"pen",4:"mouse"};sn.prototype.h=function(){sn.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var B="closure_listenable_"+(1e6*Math.random()|0),ie=0;function te(u,d,p,I,O){this.listener=u,this.proxy=null,this.src=d,this.type=p,this.capture=!!I,this.ha=O,this.key=++ie,this.da=this.fa=!1}function ce(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function ve(u){this.src=u,this.g={},this.h=0}ve.prototype.add=function(u,d,p,I,O){var F=u.toString();u=this.g[F],u||(u=this.g[F]=[],this.h++);var Y=S(u,d,I,O);return-1<Y?(d=u[Y],p||(d.fa=!1)):(d=new te(d,this.src,F,!!I,O),d.fa=p,u.push(d)),d};function w(u,d){var p=d.type;if(p in u.g){var I=u.g[p],O=Array.prototype.indexOf.call(I,d,void 0),F;(F=0<=O)&&Array.prototype.splice.call(I,O,1),F&&(ce(d),u.g[p].length==0&&(delete u.g[p],u.h--))}}function S(u,d,p,I){for(var O=0;O<u.length;++O){var F=u[O];if(!F.da&&F.listener==d&&F.capture==!!p&&F.ha==I)return O}return-1}var k="closure_lm_"+(1e6*Math.random()|0),U={};function G(u,d,p,I,O){if(Array.isArray(d)){for(var F=0;F<d.length;F++)G(u,d[F],p,I,O);return null}return p=de(p),u&&u[B]?u.K(d,p,l(I)?!!I.capture:!1,O):q(u,d,p,!1,I,O)}function q(u,d,p,I,O,F){if(!d)throw Error("Invalid event type");var Y=l(O)?!!O.capture:!!O,Fe=ne(u);if(Fe||(u[k]=Fe=new ve(u)),p=Fe.add(d,p,I,Y,F),p.proxy)return p;if(I=ee(),p.proxy=I,I.src=u,I.listener=p,u.addEventListener)Or||(O=Y),O===void 0&&(O=!1),u.addEventListener(d.toString(),I,O);else if(u.attachEvent)u.attachEvent(z(d.toString()),I);else if(u.addListener&&u.removeListener)u.addListener(I);else throw Error("addEventListener and attachEvent are unavailable.");return p}function ee(){function u(p){return d.call(u.src,u.listener,p)}const d=he;return u}function X(u,d,p,I,O){if(Array.isArray(d))for(var F=0;F<d.length;F++)X(u,d[F],p,I,O);else I=l(I)?!!I.capture:!!I,p=de(p),u&&u[B]?(u=u.i,d=String(d).toString(),d in u.g&&(F=u.g[d],p=S(F,p,I,O),-1<p&&(ce(F[p]),Array.prototype.splice.call(F,p,1),F.length==0&&(delete u.g[d],u.h--)))):u&&(u=ne(u))&&(d=u.g[d.toString()],u=-1,d&&(u=S(d,p,I,O)),(p=-1<u?d[u]:null)&&Q(p))}function Q(u){if(typeof u!="number"&&u&&!u.da){var d=u.src;if(d&&d[B])w(d.i,u);else{var p=u.type,I=u.proxy;d.removeEventListener?d.removeEventListener(p,I,u.capture):d.detachEvent?d.detachEvent(z(p),I):d.addListener&&d.removeListener&&d.removeListener(I),(p=ne(d))?(w(p,u),p.h==0&&(p.src=null,d[k]=null)):ce(u)}}}function z(u){return u in U?U[u]:U[u]="on"+u}function he(u,d){if(u.da)u=!0;else{d=new sn(d,this);var p=u.listener,I=u.ha||u.src;u.fa&&Q(u),u=p.call(I,d)}return u}function ne(u){return u=u[k],u instanceof ve?u:null}var ue="__closure_events_fn_"+(1e9*Math.random()>>>0);function de(u){return typeof u=="function"?u:(u[ue]||(u[ue]=function(d){return u.handleEvent(d)}),u[ue])}function fe(){Xe.call(this),this.i=new ve(this),this.M=this,this.F=null}b(fe,Xe),fe.prototype[B]=!0,fe.prototype.removeEventListener=function(u,d,p,I){X(this,u,d,p,I)};function ye(u,d){var p,I=u.F;if(I)for(p=[];I;I=I.F)p.push(I);if(u=u.M,I=d.type||d,typeof d=="string")d=new Ze(d,u);else if(d instanceof Ze)d.target=d.target||u;else{var O=d;d=new Ze(I,u),v(d,O)}if(O=!0,p)for(var F=p.length-1;0<=F;F--){var Y=d.g=p[F];O=De(Y,I,!0,d)&&O}if(Y=d.g=u,O=De(Y,I,!0,d)&&O,O=De(Y,I,!1,d)&&O,p)for(F=0;F<p.length;F++)Y=d.g=p[F],O=De(Y,I,!1,d)&&O}fe.prototype.N=function(){if(fe.aa.N.call(this),this.i){var u=this.i,d;for(d in u.g){for(var p=u.g[d],I=0;I<p.length;I++)ce(p[I]);delete u.g[d],u.h--}}this.F=null},fe.prototype.K=function(u,d,p,I){return this.i.add(String(u),d,!1,p,I)},fe.prototype.L=function(u,d,p,I){return this.i.add(String(u),d,!0,p,I)};function De(u,d,p,I){if(d=u.i.g[String(d)],!d)return!0;d=d.concat();for(var O=!0,F=0;F<d.length;++F){var Y=d[F];if(Y&&!Y.da&&Y.capture==p){var Fe=Y.listener,Pt=Y.ha||Y.src;Y.fa&&w(u.i,Y),O=Fe.call(Pt,I)!==!1&&O}}return O&&!I.defaultPrevented}function et(u,d,p){if(typeof u=="function")p&&(u=m(u,p));else if(u&&typeof u.handleEvent=="function")u=m(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(d)?-1:a.setTimeout(u,d||0)}function ft(u){u.g=et(()=>{u.g=null,u.i&&(u.i=!1,ft(u))},u.l);const d=u.h;u.h=null,u.m.apply(null,d)}class yn extends Xe{constructor(d,p){super(),this.m=d,this.l=p,this.h=null,this.i=!1,this.g=null}j(d){this.h=arguments,this.g?this.i=!0:ft(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Vt(u){Xe.call(this),this.h=u,this.g={}}b(Vt,Xe);var xr=[];function Do(u){j(u.g,function(d,p){this.g.hasOwnProperty(p)&&Q(d)},u),u.g={}}Vt.prototype.N=function(){Vt.aa.N.call(this),Do(this)},Vt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var St=a.JSON.stringify,In=a.JSON.parse,Pc=class{stringify(u){return a.JSON.stringify(u,void 0)}parse(u){return a.JSON.parse(u,void 0)}};function ms(){}ms.prototype.h=null;function nm(u){return u.h||(u.h=u.i())}function rm(){}var ko={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function sh(){Ze.call(this,"d")}b(sh,Ze);function oh(){Ze.call(this,"c")}b(oh,Ze);var Ri={},im=null;function Cc(){return im=im||new fe}Ri.La="serverreachability";function sm(u){Ze.call(this,Ri.La,u)}b(sm,Ze);function No(u){const d=Cc();ye(d,new sm(d))}Ri.STAT_EVENT="statevent";function om(u,d){Ze.call(this,Ri.STAT_EVENT,u),this.stat=d}b(om,Ze);function Kt(u){const d=Cc();ye(d,new om(d,u))}Ri.Ma="timingevent";function am(u,d){Ze.call(this,Ri.Ma,u),this.size=d}b(am,Ze);function Vo(u,d){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){u()},d)}function Oo(){this.g=!0}Oo.prototype.xa=function(){this.g=!1};function ob(u,d,p,I,O,F){u.info(function(){if(u.g)if(F)for(var Y="",Fe=F.split("&"),Pt=0;Pt<Fe.length;Pt++){var Ce=Fe[Pt].split("=");if(1<Ce.length){var Ot=Ce[0];Ce=Ce[1];var xt=Ot.split("_");Y=2<=xt.length&&xt[1]=="type"?Y+(Ot+"="+Ce+"&"):Y+(Ot+"=redacted&")}}else Y=null;else Y=F;return"XMLHTTP REQ ("+I+") [attempt "+O+"]: "+d+`
`+p+`
`+Y})}function ab(u,d,p,I,O,F,Y){u.info(function(){return"XMLHTTP RESP ("+I+") [ attempt "+O+"]: "+d+`
`+p+`
`+F+" "+Y})}function gs(u,d,p,I){u.info(function(){return"XMLHTTP TEXT ("+d+"): "+ub(u,p)+(I?" "+I:"")})}function cb(u,d){u.info(function(){return"TIMEOUT: "+d})}Oo.prototype.info=function(){};function ub(u,d){if(!u.g)return d;if(!d)return null;try{var p=JSON.parse(d);if(p){for(u=0;u<p.length;u++)if(Array.isArray(p[u])){var I=p[u];if(!(2>I.length)){var O=I[1];if(Array.isArray(O)&&!(1>O.length)){var F=O[0];if(F!="noop"&&F!="stop"&&F!="close")for(var Y=1;Y<O.length;Y++)O[Y]=""}}}}return St(p)}catch{return d}}var Dc={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},cm={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ah;function kc(){}b(kc,ms),kc.prototype.g=function(){return new XMLHttpRequest},kc.prototype.i=function(){return{}},ah=new kc;function Lr(u,d,p,I){this.j=u,this.i=d,this.l=p,this.R=I||1,this.U=new Vt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new um}function um(){this.i=null,this.g="",this.h=!1}var lm={},ch={};function uh(u,d,p){u.L=1,u.v=xc(Xn(d)),u.m=p,u.P=!0,hm(u,null)}function hm(u,d){u.F=Date.now(),Nc(u),u.A=Xn(u.v);var p=u.A,I=u.R;Array.isArray(I)||(I=[String(I)]),bm(p.i,"t",I),u.C=0,p=u.j.J,u.h=new um,u.g=Gm(u.j,p?d:null,!u.m),0<u.O&&(u.M=new yn(m(u.Y,u,u.g),u.O)),d=u.U,p=u.g,I=u.ca;var O="readystatechange";Array.isArray(O)||(O&&(xr[0]=O.toString()),O=xr);for(var F=0;F<O.length;F++){var Y=G(p,O[F],I||d.handleEvent,!1,d.h||d);if(!Y)break;d.g[Y.key]=Y}d=u.H?_(u.H):{},u.m?(u.u||(u.u="POST"),d["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,d)):(u.u="GET",u.g.ea(u.A,u.u,null,d)),No(),ob(u.i,u.u,u.A,u.l,u.R,u.m)}Lr.prototype.ca=function(u){u=u.target;const d=this.M;d&&Zn(u)==3?d.j():this.Y(u)},Lr.prototype.Y=function(u){try{if(u==this.g)e:{const xt=Zn(this.g);var d=this.g.Ba();const Is=this.g.Z();if(!(3>xt)&&(xt!=3||this.g&&(this.h.h||this.g.oa()||Nm(this.g)))){this.J||xt!=4||d==7||(d==8||0>=Is?No(3):No(2)),lh(this);var p=this.g.Z();this.X=p;t:if(dm(this)){var I=Nm(this.g);u="";var O=I.length,F=Zn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Si(this),xo(this);var Y="";break t}this.h.i=new a.TextDecoder}for(d=0;d<O;d++)this.h.h=!0,u+=this.h.i.decode(I[d],{stream:!(F&&d==O-1)});I.length=0,this.h.g+=u,this.C=0,Y=this.h.g}else Y=this.g.oa();if(this.o=p==200,ab(this.i,this.u,this.A,this.l,this.R,xt,p),this.o){if(this.T&&!this.K){t:{if(this.g){var Fe,Pt=this.g;if((Fe=Pt.g?Pt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!D(Fe)){var Ce=Fe;break t}}Ce=null}if(p=Ce)gs(this.i,this.l,p,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,hh(this,p);else{this.o=!1,this.s=3,Kt(12),Si(this),xo(this);break e}}if(this.P){p=!0;let Rn;for(;!this.J&&this.C<Y.length;)if(Rn=lb(this,Y),Rn==ch){xt==4&&(this.s=4,Kt(14),p=!1),gs(this.i,this.l,null,"[Incomplete Response]");break}else if(Rn==lm){this.s=4,Kt(15),gs(this.i,this.l,Y,"[Invalid Chunk]"),p=!1;break}else gs(this.i,this.l,Rn,null),hh(this,Rn);if(dm(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),xt!=4||Y.length!=0||this.h.h||(this.s=1,Kt(16),p=!1),this.o=this.o&&p,!p)gs(this.i,this.l,Y,"[Invalid Chunked Response]"),Si(this),xo(this);else if(0<Y.length&&!this.W){this.W=!0;var Ot=this.j;Ot.g==this&&Ot.ba&&!Ot.M&&(Ot.j.info("Great, no buffering proxy detected. Bytes received: "+Y.length),_h(Ot),Ot.M=!0,Kt(11))}}else gs(this.i,this.l,Y,null),hh(this,Y);xt==4&&Si(this),this.o&&!this.J&&(xt==4?Um(this.j,this):(this.o=!1,Nc(this)))}else Sb(this.g),p==400&&0<Y.indexOf("Unknown SID")?(this.s=3,Kt(12)):(this.s=0,Kt(13)),Si(this),xo(this)}}}catch{}finally{}};function dm(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function lb(u,d){var p=u.C,I=d.indexOf(`
`,p);return I==-1?ch:(p=Number(d.substring(p,I)),isNaN(p)?lm:(I+=1,I+p>d.length?ch:(d=d.slice(I,I+p),u.C=I+p,d)))}Lr.prototype.cancel=function(){this.J=!0,Si(this)};function Nc(u){u.S=Date.now()+u.I,fm(u,u.I)}function fm(u,d){if(u.B!=null)throw Error("WatchDog timer not null");u.B=Vo(m(u.ba,u),d)}function lh(u){u.B&&(a.clearTimeout(u.B),u.B=null)}Lr.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(cb(this.i,this.A),this.L!=2&&(No(),Kt(17)),Si(this),this.s=2,xo(this)):fm(this,this.S-u)};function xo(u){u.j.G==0||u.J||Um(u.j,u)}function Si(u){lh(u);var d=u.M;d&&typeof d.ma=="function"&&d.ma(),u.M=null,Do(u.U),u.g&&(d=u.g,u.g=null,d.abort(),d.ma())}function hh(u,d){try{var p=u.j;if(p.G!=0&&(p.g==u||dh(p.h,u))){if(!u.K&&dh(p.h,u)&&p.G==3){try{var I=p.Da.g.parse(d)}catch{I=null}if(Array.isArray(I)&&I.length==3){var O=I;if(O[0]==0){e:if(!p.u){if(p.g)if(p.g.F+3e3<u.F)qc(p),Uc(p);else break e;gh(p),Kt(18)}}else p.za=O[1],0<p.za-p.T&&37500>O[2]&&p.F&&p.v==0&&!p.C&&(p.C=Vo(m(p.Za,p),6e3));if(1>=gm(p.h)&&p.ca){try{p.ca()}catch{}p.ca=void 0}}else Ci(p,11)}else if((u.K||p.g==u)&&qc(p),!D(d))for(O=p.Da.g.parse(d),d=0;d<O.length;d++){let Ce=O[d];if(p.T=Ce[0],Ce=Ce[1],p.G==2)if(Ce[0]=="c"){p.K=Ce[1],p.ia=Ce[2];const Ot=Ce[3];Ot!=null&&(p.la=Ot,p.j.info("VER="+p.la));const xt=Ce[4];xt!=null&&(p.Aa=xt,p.j.info("SVER="+p.Aa));const Is=Ce[5];Is!=null&&typeof Is=="number"&&0<Is&&(I=1.5*Is,p.L=I,p.j.info("backChannelRequestTimeoutMs_="+I)),I=p;const Rn=u.g;if(Rn){const Gc=Rn.g?Rn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Gc){var F=I.h;F.g||Gc.indexOf("spdy")==-1&&Gc.indexOf("quic")==-1&&Gc.indexOf("h2")==-1||(F.j=F.l,F.g=new Set,F.h&&(fh(F,F.h),F.h=null))}if(I.D){const yh=Rn.g?Rn.g.getResponseHeader("X-HTTP-Session-Id"):null;yh&&(I.ya=yh,je(I.I,I.D,yh))}}p.G=3,p.l&&p.l.ua(),p.ba&&(p.R=Date.now()-u.F,p.j.info("Handshake RTT: "+p.R+"ms")),I=p;var Y=u;if(I.qa=jm(I,I.J?I.ia:null,I.W),Y.K){_m(I.h,Y);var Fe=Y,Pt=I.L;Pt&&(Fe.I=Pt),Fe.B&&(lh(Fe),Nc(Fe)),I.g=Y}else Mm(I);0<p.i.length&&Bc(p)}else Ce[0]!="stop"&&Ce[0]!="close"||Ci(p,7);else p.G==3&&(Ce[0]=="stop"||Ce[0]=="close"?Ce[0]=="stop"?Ci(p,7):mh(p):Ce[0]!="noop"&&p.l&&p.l.ta(Ce),p.v=0)}}No(4)}catch{}}var hb=class{constructor(u,d){this.g=u,this.map=d}};function pm(u){this.l=u||10,a.PerformanceNavigationTiming?(u=a.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function mm(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function gm(u){return u.h?1:u.g?u.g.size:0}function dh(u,d){return u.h?u.h==d:u.g?u.g.has(d):!1}function fh(u,d){u.g?u.g.add(d):u.h=d}function _m(u,d){u.h&&u.h==d?u.h=null:u.g&&u.g.has(d)&&u.g.delete(d)}pm.prototype.cancel=function(){if(this.i=ym(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function ym(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let d=u.i;for(const p of u.g.values())d=d.concat(p.D);return d}return R(u.i)}function db(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(c(u)){for(var d=[],p=u.length,I=0;I<p;I++)d.push(u[I]);return d}d=[],p=0;for(I in u)d[p++]=u[I];return d}function fb(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(c(u)||typeof u=="string"){var d=[];u=u.length;for(var p=0;p<u;p++)d.push(p);return d}d=[],p=0;for(const I in u)d[p++]=I;return d}}}function Im(u,d){if(u.forEach&&typeof u.forEach=="function")u.forEach(d,void 0);else if(c(u)||typeof u=="string")Array.prototype.forEach.call(u,d,void 0);else for(var p=fb(u),I=db(u),O=I.length,F=0;F<O;F++)d.call(void 0,I[F],p&&p[F],u)}var vm=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function pb(u,d){if(u){u=u.split("&");for(var p=0;p<u.length;p++){var I=u[p].indexOf("="),O=null;if(0<=I){var F=u[p].substring(0,I);O=u[p].substring(I+1)}else F=u[p];d(F,O?decodeURIComponent(O.replace(/\+/g," ")):"")}}}function Pi(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof Pi){this.h=u.h,Vc(this,u.j),this.o=u.o,this.g=u.g,Oc(this,u.s),this.l=u.l;var d=u.i,p=new Fo;p.i=d.i,d.g&&(p.g=new Map(d.g),p.h=d.h),Em(this,p),this.m=u.m}else u&&(d=String(u).match(vm))?(this.h=!1,Vc(this,d[1]||"",!0),this.o=Lo(d[2]||""),this.g=Lo(d[3]||"",!0),Oc(this,d[4]),this.l=Lo(d[5]||"",!0),Em(this,d[6]||"",!0),this.m=Lo(d[7]||"")):(this.h=!1,this.i=new Fo(null,this.h))}Pi.prototype.toString=function(){var u=[],d=this.j;d&&u.push(Mo(d,Tm,!0),":");var p=this.g;return(p||d=="file")&&(u.push("//"),(d=this.o)&&u.push(Mo(d,Tm,!0),"@"),u.push(encodeURIComponent(String(p)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),p=this.s,p!=null&&u.push(":",String(p))),(p=this.l)&&(this.g&&p.charAt(0)!="/"&&u.push("/"),u.push(Mo(p,p.charAt(0)=="/"?_b:gb,!0))),(p=this.i.toString())&&u.push("?",p),(p=this.m)&&u.push("#",Mo(p,Ib)),u.join("")};function Xn(u){return new Pi(u)}function Vc(u,d,p){u.j=p?Lo(d,!0):d,u.j&&(u.j=u.j.replace(/:$/,""))}function Oc(u,d){if(d){if(d=Number(d),isNaN(d)||0>d)throw Error("Bad port number "+d);u.s=d}else u.s=null}function Em(u,d,p){d instanceof Fo?(u.i=d,vb(u.i,u.h)):(p||(d=Mo(d,yb)),u.i=new Fo(d,u.h))}function je(u,d,p){u.i.set(d,p)}function xc(u){return je(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function Lo(u,d){return u?d?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function Mo(u,d,p){return typeof u=="string"?(u=encodeURI(u).replace(d,mb),p&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function mb(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Tm=/[#\/\?@]/g,gb=/[#\?:]/g,_b=/[#\?]/g,yb=/[#\?@]/g,Ib=/#/g;function Fo(u,d){this.h=this.g=null,this.i=u||null,this.j=!!d}function Mr(u){u.g||(u.g=new Map,u.h=0,u.i&&pb(u.i,function(d,p){u.add(decodeURIComponent(d.replace(/\+/g," ")),p)}))}n=Fo.prototype,n.add=function(u,d){Mr(this),this.i=null,u=_s(this,u);var p=this.g.get(u);return p||this.g.set(u,p=[]),p.push(d),this.h+=1,this};function wm(u,d){Mr(u),d=_s(u,d),u.g.has(d)&&(u.i=null,u.h-=u.g.get(d).length,u.g.delete(d))}function Am(u,d){return Mr(u),d=_s(u,d),u.g.has(d)}n.forEach=function(u,d){Mr(this),this.g.forEach(function(p,I){p.forEach(function(O){u.call(d,O,I,this)},this)},this)},n.na=function(){Mr(this);const u=Array.from(this.g.values()),d=Array.from(this.g.keys()),p=[];for(let I=0;I<d.length;I++){const O=u[I];for(let F=0;F<O.length;F++)p.push(d[I])}return p},n.V=function(u){Mr(this);let d=[];if(typeof u=="string")Am(this,u)&&(d=d.concat(this.g.get(_s(this,u))));else{u=Array.from(this.g.values());for(let p=0;p<u.length;p++)d=d.concat(u[p])}return d},n.set=function(u,d){return Mr(this),this.i=null,u=_s(this,u),Am(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[d]),this.h+=1,this},n.get=function(u,d){return u?(u=this.V(u),0<u.length?String(u[0]):d):d};function bm(u,d,p){wm(u,d),0<p.length&&(u.i=null,u.g.set(_s(u,d),R(p)),u.h+=p.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],d=Array.from(this.g.keys());for(var p=0;p<d.length;p++){var I=d[p];const F=encodeURIComponent(String(I)),Y=this.V(I);for(I=0;I<Y.length;I++){var O=F;Y[I]!==""&&(O+="="+encodeURIComponent(String(Y[I]))),u.push(O)}}return this.i=u.join("&")};function _s(u,d){return d=String(d),u.j&&(d=d.toLowerCase()),d}function vb(u,d){d&&!u.j&&(Mr(u),u.i=null,u.g.forEach(function(p,I){var O=I.toLowerCase();I!=O&&(wm(this,I),bm(this,O,p))},u)),u.j=d}function Eb(u,d){const p=new Oo;if(a.Image){const I=new Image;I.onload=g(Fr,p,"TestLoadImage: loaded",!0,d,I),I.onerror=g(Fr,p,"TestLoadImage: error",!1,d,I),I.onabort=g(Fr,p,"TestLoadImage: abort",!1,d,I),I.ontimeout=g(Fr,p,"TestLoadImage: timeout",!1,d,I),a.setTimeout(function(){I.ontimeout&&I.ontimeout()},1e4),I.src=u}else d(!1)}function Tb(u,d){const p=new Oo,I=new AbortController,O=setTimeout(()=>{I.abort(),Fr(p,"TestPingServer: timeout",!1,d)},1e4);fetch(u,{signal:I.signal}).then(F=>{clearTimeout(O),F.ok?Fr(p,"TestPingServer: ok",!0,d):Fr(p,"TestPingServer: server error",!1,d)}).catch(()=>{clearTimeout(O),Fr(p,"TestPingServer: error",!1,d)})}function Fr(u,d,p,I,O){try{O&&(O.onload=null,O.onerror=null,O.onabort=null,O.ontimeout=null),I(p)}catch{}}function wb(){this.g=new Pc}function Ab(u,d,p){const I=p||"";try{Im(u,function(O,F){let Y=O;l(O)&&(Y=St(O)),d.push(I+F+"="+encodeURIComponent(Y))})}catch(O){throw d.push(I+"type="+encodeURIComponent("_badmap")),O}}function Lc(u){this.l=u.Ub||null,this.j=u.eb||!1}b(Lc,ms),Lc.prototype.g=function(){return new Mc(this.l,this.j)},Lc.prototype.i=(function(u){return function(){return u}})({});function Mc(u,d){fe.call(this),this.D=u,this.o=d,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}b(Mc,fe),n=Mc.prototype,n.open=function(u,d){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=d,this.readyState=1,Bo(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const d={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(d.body=u),(this.D||a).fetch(new Request(this.A,d)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Uo(this)),this.readyState=0},n.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Bo(this)),this.g&&(this.readyState=3,Bo(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Rm(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function Rm(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}n.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var d=u.value?u.value:new Uint8Array(0);(d=this.v.decode(d,{stream:!u.done}))&&(this.response=this.responseText+=d)}u.done?Uo(this):Bo(this),this.readyState==3&&Rm(this)}},n.Ra=function(u){this.g&&(this.response=this.responseText=u,Uo(this))},n.Qa=function(u){this.g&&(this.response=u,Uo(this))},n.ga=function(){this.g&&Uo(this)};function Uo(u){u.readyState=4,u.l=null,u.j=null,u.v=null,Bo(u)}n.setRequestHeader=function(u,d){this.u.append(u,d)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],d=this.h.entries();for(var p=d.next();!p.done;)p=p.value,u.push(p[0]+": "+p[1]),p=d.next();return u.join(`\r
`)};function Bo(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(Mc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function Sm(u){let d="";return j(u,function(p,I){d+=I,d+=":",d+=p,d+=`\r
`}),d}function ph(u,d,p){e:{for(I in p){var I=!1;break e}I=!0}I||(p=Sm(p),typeof u=="string"?p!=null&&encodeURIComponent(String(p)):je(u,d,p))}function nt(u){fe.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}b(nt,fe);var bb=/^https?$/i,Rb=["POST","PUT"];n=nt.prototype,n.Ha=function(u){this.J=u},n.ea=function(u,d,p,I){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);d=d?d.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ah.g(),this.v=this.o?nm(this.o):nm(ah),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(d,String(u),!0),this.B=!1}catch(F){Pm(this,F);return}if(u=p||"",p=new Map(this.headers),I)if(Object.getPrototypeOf(I)===Object.prototype)for(var O in I)p.set(O,I[O]);else if(typeof I.keys=="function"&&typeof I.get=="function")for(const F of I.keys())p.set(F,I.get(F));else throw Error("Unknown input type for opt_headers: "+String(I));I=Array.from(p.keys()).find(F=>F.toLowerCase()=="content-type"),O=a.FormData&&u instanceof a.FormData,!(0<=Array.prototype.indexOf.call(Rb,d,void 0))||I||O||p.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[F,Y]of p)this.g.setRequestHeader(F,Y);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{km(this),this.u=!0,this.g.send(u),this.u=!1}catch(F){Pm(this,F)}};function Pm(u,d){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=d,u.m=5,Cm(u),Fc(u)}function Cm(u){u.A||(u.A=!0,ye(u,"complete"),ye(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,ye(this,"complete"),ye(this,"abort"),Fc(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Fc(this,!0)),nt.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Dm(this):this.bb())},n.bb=function(){Dm(this)};function Dm(u){if(u.h&&typeof o<"u"&&(!u.v[1]||Zn(u)!=4||u.Z()!=2)){if(u.u&&Zn(u)==4)et(u.Ea,0,u);else if(ye(u,"readystatechange"),Zn(u)==4){u.h=!1;try{const Y=u.Z();e:switch(Y){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var d=!0;break e;default:d=!1}var p;if(!(p=d)){var I;if(I=Y===0){var O=String(u.D).match(vm)[1]||null;!O&&a.self&&a.self.location&&(O=a.self.location.protocol.slice(0,-1)),I=!bb.test(O?O.toLowerCase():"")}p=I}if(p)ye(u,"complete"),ye(u,"success");else{u.m=6;try{var F=2<Zn(u)?u.g.statusText:""}catch{F=""}u.l=F+" ["+u.Z()+"]",Cm(u)}}finally{Fc(u)}}}}function Fc(u,d){if(u.g){km(u);const p=u.g,I=u.v[0]?()=>{}:null;u.g=null,u.v=null,d||ye(u,"ready");try{p.onreadystatechange=I}catch{}}}function km(u){u.I&&(a.clearTimeout(u.I),u.I=null)}n.isActive=function(){return!!this.g};function Zn(u){return u.g?u.g.readyState:0}n.Z=function(){try{return 2<Zn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(u){if(this.g){var d=this.g.responseText;return u&&d.indexOf(u)==0&&(d=d.substring(u.length)),In(d)}};function Nm(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function Sb(u){const d={};u=(u.g&&2<=Zn(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let I=0;I<u.length;I++){if(D(u[I]))continue;var p=P(u[I]);const O=p[0];if(p=p[1],typeof p!="string")continue;p=p.trim();const F=d[O]||[];d[O]=F,F.push(p)}E(d,function(I){return I.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function qo(u,d,p){return p&&p.internalChannelParams&&p.internalChannelParams[u]||d}function Vm(u){this.Aa=0,this.i=[],this.j=new Oo,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=qo("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=qo("baseRetryDelayMs",5e3,u),this.cb=qo("retryDelaySeedMs",1e4,u),this.Wa=qo("forwardChannelMaxRetries",2,u),this.wa=qo("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new pm(u&&u.concurrentRequestLimit),this.Da=new wb,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Vm.prototype,n.la=8,n.G=1,n.connect=function(u,d,p,I){Kt(0),this.W=u,this.H=d||{},p&&I!==void 0&&(this.H.OSID=p,this.H.OAID=I),this.F=this.X,this.I=jm(this,null,this.W),Bc(this)};function mh(u){if(Om(u),u.G==3){var d=u.U++,p=Xn(u.I);if(je(p,"SID",u.K),je(p,"RID",d),je(p,"TYPE","terminate"),jo(u,p),d=new Lr(u,u.j,d),d.L=2,d.v=xc(Xn(p)),p=!1,a.navigator&&a.navigator.sendBeacon)try{p=a.navigator.sendBeacon(d.v.toString(),"")}catch{}!p&&a.Image&&(new Image().src=d.v,p=!0),p||(d.g=Gm(d.j,null),d.g.ea(d.v)),d.F=Date.now(),Nc(d)}qm(u)}function Uc(u){u.g&&(_h(u),u.g.cancel(),u.g=null)}function Om(u){Uc(u),u.u&&(a.clearTimeout(u.u),u.u=null),qc(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&a.clearTimeout(u.s),u.s=null)}function Bc(u){if(!mm(u.h)&&!u.s){u.s=!0;var d=u.Ga;pe||bn(),Te||(pe(),Te=!0),rn.add(d,u),u.B=0}}function Pb(u,d){return gm(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=d.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=Vo(m(u.Ga,u,d),Bm(u,u.B)),u.B++,!0)}n.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const O=new Lr(this,this.j,u);let F=this.o;if(this.S&&(F?(F=_(F),v(F,this.S)):F=this.S),this.m!==null||this.O||(O.H=F,F=null),this.P)e:{for(var d=0,p=0;p<this.i.length;p++){t:{var I=this.i[p];if("__data__"in I.map&&(I=I.map.__data__,typeof I=="string")){I=I.length;break t}I=void 0}if(I===void 0)break;if(d+=I,4096<d){d=p;break e}if(d===4096||p===this.i.length-1){d=p+1;break e}}d=1e3}else d=1e3;d=Lm(this,O,d),p=Xn(this.I),je(p,"RID",u),je(p,"CVER",22),this.D&&je(p,"X-HTTP-Session-Id",this.D),jo(this,p),F&&(this.O?d="headers="+encodeURIComponent(String(Sm(F)))+"&"+d:this.m&&ph(p,this.m,F)),fh(this.h,O),this.Ua&&je(p,"TYPE","init"),this.P?(je(p,"$req",d),je(p,"SID","null"),O.T=!0,uh(O,p,null)):uh(O,p,d),this.G=2}}else this.G==3&&(u?xm(this,u):this.i.length==0||mm(this.h)||xm(this))};function xm(u,d){var p;d?p=d.l:p=u.U++;const I=Xn(u.I);je(I,"SID",u.K),je(I,"RID",p),je(I,"AID",u.T),jo(u,I),u.m&&u.o&&ph(I,u.m,u.o),p=new Lr(u,u.j,p,u.B+1),u.m===null&&(p.H=u.o),d&&(u.i=d.D.concat(u.i)),d=Lm(u,p,1e3),p.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),fh(u.h,p),uh(p,I,d)}function jo(u,d){u.H&&j(u.H,function(p,I){je(d,I,p)}),u.l&&Im({},function(p,I){je(d,I,p)})}function Lm(u,d,p){p=Math.min(u.i.length,p);var I=u.l?m(u.l.Na,u.l,u):null;e:{var O=u.i;let F=-1;for(;;){const Y=["count="+p];F==-1?0<p?(F=O[0].g,Y.push("ofs="+F)):F=0:Y.push("ofs="+F);let Fe=!0;for(let Pt=0;Pt<p;Pt++){let Ce=O[Pt].g;const Ot=O[Pt].map;if(Ce-=F,0>Ce)F=Math.max(0,O[Pt].g-100),Fe=!1;else try{Ab(Ot,Y,"req"+Ce+"_")}catch{I&&I(Ot)}}if(Fe){I=Y.join("&");break e}}}return u=u.i.splice(0,p),d.D=u,I}function Mm(u){if(!u.g&&!u.u){u.Y=1;var d=u.Fa;pe||bn(),Te||(pe(),Te=!0),rn.add(d,u),u.v=0}}function gh(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=Vo(m(u.Fa,u),Bm(u,u.v)),u.v++,!0)}n.Fa=function(){if(this.u=null,Fm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=Vo(m(this.ab,this),u)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Kt(10),Uc(this),Fm(this))};function _h(u){u.A!=null&&(a.clearTimeout(u.A),u.A=null)}function Fm(u){u.g=new Lr(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var d=Xn(u.qa);je(d,"RID","rpc"),je(d,"SID",u.K),je(d,"AID",u.T),je(d,"CI",u.F?"0":"1"),!u.F&&u.ja&&je(d,"TO",u.ja),je(d,"TYPE","xmlhttp"),jo(u,d),u.m&&u.o&&ph(d,u.m,u.o),u.L&&(u.g.I=u.L);var p=u.g;u=u.ia,p.L=1,p.v=xc(Xn(d)),p.m=null,p.P=!0,hm(p,u)}n.Za=function(){this.C!=null&&(this.C=null,Uc(this),gh(this),Kt(19))};function qc(u){u.C!=null&&(a.clearTimeout(u.C),u.C=null)}function Um(u,d){var p=null;if(u.g==d){qc(u),_h(u),u.g=null;var I=2}else if(dh(u.h,d))p=d.D,_m(u.h,d),I=1;else return;if(u.G!=0){if(d.o)if(I==1){p=d.m?d.m.length:0,d=Date.now()-d.F;var O=u.B;I=Cc(),ye(I,new am(I,p)),Bc(u)}else Mm(u);else if(O=d.s,O==3||O==0&&0<d.X||!(I==1&&Pb(u,d)||I==2&&gh(u)))switch(p&&0<p.length&&(d=u.h,d.i=d.i.concat(p)),O){case 1:Ci(u,5);break;case 4:Ci(u,10);break;case 3:Ci(u,6);break;default:Ci(u,2)}}}function Bm(u,d){let p=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(p*=2),p*d}function Ci(u,d){if(u.j.info("Error code "+d),d==2){var p=m(u.fb,u),I=u.Xa;const O=!I;I=new Pi(I||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Vc(I,"https"),xc(I),O?Eb(I.toString(),p):Tb(I.toString(),p)}else Kt(2);u.G=0,u.l&&u.l.sa(d),qm(u),Om(u)}n.fb=function(u){u?(this.j.info("Successfully pinged google.com"),Kt(2)):(this.j.info("Failed to ping google.com"),Kt(1))};function qm(u){if(u.G=0,u.ka=[],u.l){const d=ym(u.h);(d.length!=0||u.i.length!=0)&&(C(u.ka,d),C(u.ka,u.i),u.h.i.length=0,R(u.i),u.i.length=0),u.l.ra()}}function jm(u,d,p){var I=p instanceof Pi?Xn(p):new Pi(p);if(I.g!="")d&&(I.g=d+"."+I.g),Oc(I,I.s);else{var O=a.location;I=O.protocol,d=d?d+"."+O.hostname:O.hostname,O=+O.port;var F=new Pi(null);I&&Vc(F,I),d&&(F.g=d),O&&Oc(F,O),p&&(F.l=p),I=F}return p=u.D,d=u.ya,p&&d&&je(I,p,d),je(I,"VER",u.la),jo(u,I),I}function Gm(u,d,p){if(d&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return d=u.Ca&&!u.pa?new nt(new Lc({eb:p})):new nt(u.pa),d.Ha(u.J),d}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Km(){}n=Km.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function jc(){}jc.prototype.g=function(u,d){return new on(u,d)};function on(u,d){fe.call(this),this.g=new Vm(d),this.l=u,this.h=d&&d.messageUrlParams||null,u=d&&d.messageHeaders||null,d&&d.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=d&&d.initMessageHeaders||null,d&&d.messageContentType&&(u?u["X-WebChannel-Content-Type"]=d.messageContentType:u={"X-WebChannel-Content-Type":d.messageContentType}),d&&d.va&&(u?u["X-WebChannel-Client-Profile"]=d.va:u={"X-WebChannel-Client-Profile":d.va}),this.g.S=u,(u=d&&d.Sb)&&!D(u)&&(this.g.m=u),this.v=d&&d.supportsCrossDomainXhr||!1,this.u=d&&d.sendRawJson||!1,(d=d&&d.httpSessionIdParam)&&!D(d)&&(this.g.D=d,u=this.h,u!==null&&d in u&&(u=this.h,d in u&&delete u[d])),this.j=new ys(this)}b(on,fe),on.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},on.prototype.close=function(){mh(this.g)},on.prototype.o=function(u){var d=this.g;if(typeof u=="string"){var p={};p.__data__=u,u=p}else this.u&&(p={},p.__data__=St(u),u=p);d.i.push(new hb(d.Ya++,u)),d.G==3&&Bc(d)},on.prototype.N=function(){this.g.l=null,delete this.j,mh(this.g),delete this.g,on.aa.N.call(this)};function $m(u){sh.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var d=u.__sm__;if(d){e:{for(const p in d){u=p;break e}u=void 0}(this.i=u)&&(u=this.i,d=d!==null&&u in d?d[u]:void 0),this.data=d}else this.data=u}b($m,sh);function zm(){oh.call(this),this.status=1}b(zm,oh);function ys(u){this.g=u}b(ys,Km),ys.prototype.ua=function(){ye(this.g,"a")},ys.prototype.ta=function(u){ye(this.g,new $m(u))},ys.prototype.sa=function(u){ye(this.g,new zm)},ys.prototype.ra=function(){ye(this.g,"b")},jc.prototype.createWebChannel=jc.prototype.g,on.prototype.send=on.prototype.o,on.prototype.open=on.prototype.m,on.prototype.close=on.prototype.close,Wv=function(){return new jc},Hv=function(){return Cc()},zv=Ri,wd={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Dc.NO_ERROR=0,Dc.TIMEOUT=8,Dc.HTTP_ERROR=6,lu=Dc,cm.COMPLETE="complete",$v=cm,rm.EventType=ko,ko.OPEN="a",ko.CLOSE="b",ko.ERROR="c",ko.MESSAGE="d",fe.prototype.listen=fe.prototype.K,oa=rm,nt.prototype.listenOnce=nt.prototype.L,nt.prototype.getLastError=nt.prototype.Ka,nt.prototype.getLastErrorCode=nt.prototype.Ba,nt.prototype.getStatus=nt.prototype.Z,nt.prototype.getResponseJson=nt.prototype.Oa,nt.prototype.getResponseText=nt.prototype.oa,nt.prototype.send=nt.prototype.ea,nt.prototype.setWithCredentials=nt.prototype.Ha,Kv=nt}).apply(typeof Qc<"u"?Qc:typeof self<"u"?self:typeof window<"u"?window:{});const Jg="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}wt.UNAUTHENTICATED=new wt(null),wt.GOOGLE_CREDENTIALS=new wt("google-credentials-uid"),wt.FIRST_PARTY=new wt("first-party-uid"),wt.MOCK_USER=new wt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const ci=new Ef("@firebase/firestore");function Cs(){return ci.logLevel}function eC(n){ci.setLogLevel(n)}function $(n,...e){if(ci.logLevel<=we.DEBUG){const t=e.map(Af);ci.debug(`Firestore (${po}): ${n}`,...t)}}function lt(n,...e){if(ci.logLevel<=we.ERROR){const t=e.map(Af);ci.error(`Firestore (${po}): ${n}`,...t)}}function mn(n,...e){if(ci.logLevel<=we.WARN){const t=e.map(Af);ci.warn(`Firestore (${po}): ${n}`,...t)}}function Af(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
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
 */function re(n="Unexpected state"){const e=`FIRESTORE (${po}) INTERNAL ASSERTION FAILED: `+n;throw lt(e),new Error(e)}function se(n,e){n||re()}function tC(n,e){n||re()}function J(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class K extends Yn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qv{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Jv{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(wt.UNAUTHENTICATED)))}shutdown(){}}class nC{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class rC{constructor(e){this.t=e,this.currentUser=wt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){se(this.o===void 0);let r=this.i;const i=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let s=new At;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new At,e.enqueueRetryable((()=>i(this.currentUser)))};const o=()=>{const c=s;e.enqueueRetryable((async()=>{await c.promise,await i(this.currentUser)}))},a=c=>{$("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>a(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):($("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new At)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?($("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(se(typeof r.accessToken=="string"),new Qv(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return se(e===null||typeof e=="string"),new wt(e)}}class iC{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=wt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class sC{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new iC(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(wt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Yv{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class oC{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){se(this.o===void 0);const r=s=>{s.error!=null&&$("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,$("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>r(s)))};const i=s=>{$("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):$("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(se(typeof t.token=="string"),this.R=t.token,new Yv(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class aC{getToken(){return Promise.resolve(new Yv(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cC(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=cC(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}}function me(n,e){return n<e?-1:n>e?1:0}function zs(n,e,t){return n.length===e.length&&n.every(((r,i)=>t(r,e[i])))}function Xv(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ba{constructor(e,t,r){t===void 0?t=0:t>e.length&&re(),r===void 0?r=e.length-t:r>e.length-t&&re(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Ba.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Ba?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Ae extends Ba{construct(e,t,r){return new Ae(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new K(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((i=>i.length>0)))}return new Ae(t)}static emptyPath(){return new Ae([])}}const uC=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ke extends Ba{construct(e,t,r){return new Ke(e,t,r)}static isValidIdentifier(e){return uC.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ke.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Ke(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new K(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new K(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new K(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new K(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ke(t)}static emptyPath(){return new Ke([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Hs{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Ad(n){return n.fields.find((e=>e.kind===2))}function Mi(n){return n.fields.filter((e=>e.kind!==2))}function lC(n,e){let t=me(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=hC(n.fields[r],e.fields[r]),t!==0)return t;return me(n.fields.length,e.fields.length)}Hs.UNKNOWN_ID=-1;class Ji{constructor(e,t){this.fieldPath=e,this.kind=t}}function hC(n,e){const t=Ke.comparator(n.fieldPath,e.fieldPath);return t!==0?t:me(n.kind,e.kind)}class Ws{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Ws(0,gn.min())}}function Zv(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=ae.fromTimestamp(r===1e9?new Je(t+1,0):new Je(t,r));return new gn(i,Z.empty(),e)}function eE(n){return new gn(n.readTime,n.key,-1)}class gn{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new gn(ae.min(),Z.empty(),-1)}static max(){return new gn(ae.max(),Z.empty(),-1)}}function Rf(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=Z.comparator(n.documentKey,e.documentKey),t!==0?t:me(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class nE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yi(n){if(n.code!==L.FAILED_PRECONDITION||n.message!==tE)throw n;$("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class vl{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new At,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Ia(e,t.error)):this.V.resolve()},this.transaction.onerror=r=>{const i=Sf(r.target.error);this.V.reject(new Ia(e,i))}}static open(e,t,r,i){try{return new vl(t,e.transaction(i,r))}catch(s){throw new Ia(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||($("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new fC(t)}}class Hn{constructor(e,t,r){this.name=e,this.version=t,this.p=r,Hn.S(vt())===12.2&&lt("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return $("SimpleDb","Removing database:",e),Bi(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Fv())return!1;if(Hn.v())return!0;const e=vt(),t=Hn.S(e),r=0<t&&t<10,i=rE(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||($("SimpleDb","Opening database:",this.name),this.db=await new Promise(((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new Ia(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new K(L.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new K(L.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Ia(e,o))},i.onupgradeneeded=s=>{$("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next((()=>{$("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const a=vl.open(this.db,e,s?"readonly":"readwrite",r),c=i(a).next((l=>(a.g(),l))).catch((l=>(a.abort(l),N.reject(l)))).toPromise();return c.catch((()=>{})),await a.m,c}catch(a){const c=a,l=c.name!=="FirebaseError"&&o<3;if($("SimpleDb","Transaction failed with error:",c.message,"Retrying:",l),this.close(),!l)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function rE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class dC{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return Bi(this.B.delete())}}class Ia extends K{constructor(e,t){super(L.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Ii(n){return n.name==="IndexedDbTransactionError"}class fC{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?($("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):($("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),Bi(r)}add(e){return $("SimpleDb","ADD",this.store.name,e,e),Bi(this.store.add(e))}get(e){return Bi(this.store.get(e)).next((t=>(t===void 0&&(t=null),$("SimpleDb","GET",this.store.name,e,t),t)))}delete(e){return $("SimpleDb","DELETE",this.store.name,e),Bi(this.store.delete(e))}count(){return $("SimpleDb","COUNT",this.store.name),Bi(this.store.count())}U(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new N(((o,a)=>{s.onerror=c=>{a(c.target.error)},s.onsuccess=c=>{o(c.target.result)}}))}{const s=this.cursor(r),o=[];return this.W(s,((a,c)=>{o.push(c)})).next((()=>o))}}G(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new N(((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}}))}j(e,t){$("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,t);r.H=!1;const i=this.cursor(r);return this.W(i,((s,o,a)=>a.delete()))}J(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.W(i,t)}Y(e){const t=this.cursor({});return new N(((r,i)=>{t.onerror=s=>{const o=Sf(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next((a=>{a?o.continue():r()})):r()}}))}W(e,t){const r=[];return new N(((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const c=new dC(a),l=t(a.primaryKey,a.value,c);if(l instanceof N){const h=l.catch((f=>(c.done(),N.reject(f))));r.push(h)}c.isDone?i():c.K===null?a.continue():a.continue(c.K)}})).next((()=>N.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Bi(n){return new N(((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Sf(r.target.error);t(i)}}))}let Yg=!1;function Sf(n){const e=Hn.S(vt());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new K("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Yg||(Yg=!0,setTimeout((()=>{throw r}),0)),r}}return n}class pC{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){$("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{$("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Ii(t)?$("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await yi(t)}await this.X(6e4)}))}}class mC{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.te(t,e)))}te(e,t){const r=new Set;let i=t,s=!0;return N.doWhile((()=>s===!0&&i>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return $("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next((a=>{i-=a,r.add(o)}));s=!1})))).next((()=>t-i))}ne(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next((s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this.re(i,s))).next((a=>($("IndexBackfiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a)))).next((()=>o.size))}))))}re(e,t){let r=e;return t.changes.forEach(((i,s)=>{const o=eE(s);Rf(o,r)>0&&(r=o)})),new gn(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class Zt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Zt.oe=-1;function cc(n){return n==null}function qa(n){return n===0&&1/n==-1/0}function iE(n){return typeof n=="number"&&Number.isInteger(n)&&!qa(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Xg(e)),e=gC(n.get(t),e);return Xg(e)}function gC(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Xg(n){return n+""}function qn(n){const e=n.length;if(se(e>=2),e===2)return se(n.charAt(0)===""&&n.charAt(1)===""),Ae.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf("",s);switch((o<0||o>t)&&re(),n.charAt(o+1)){case"":const a=n.substring(s,o);let c;i.length===0?c=a:(i+=a,c=i,i=""),r.push(c);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:re()}s=o+2}return new Ae(r)}/**
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
 */const Zg=["userId","batchId"];/**
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
 */function hu(n,e){return[n,jt(e)]}function sE(n,e,t){return[n,jt(e),t]}const _C={},yC=["prefixPath","collectionGroup","readTime","documentId"],IC=["prefixPath","collectionGroup","documentId"],vC=["collectionGroup","readTime","prefixPath","documentId"],EC=["canonicalId","targetId"],TC=["targetId","path"],wC=["path","targetId"],AC=["collectionId","parent"],bC=["indexId","uid"],RC=["uid","sequenceNumber"],SC=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],PC=["indexId","uid","orderedDocumentKey"],CC=["userId","collectionPath","documentId"],DC=["userId","collectionPath","largestBatchId"],kC=["userId","collectionGroup","largestBatchId"],oE=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],NC=[...oE,"documentOverlays"],aE=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],cE=aE,Pf=[...cE,"indexConfiguration","indexState","indexEntries"],VC=Pf,OC=[...Pf,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd extends nE{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function Et(n,e){const t=J(n);return Hn.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e_(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function vi(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function uE(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function lE(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,t){this.comparator=e,this.root=t||Ct.EMPTY}insert(e,t){return new qe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ct.BLACK,null,null))}remove(e){return new qe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ct.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Jc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Jc(this.root,e,this.comparator,!1)}getReverseIterator(){return new Jc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Jc(this.root,e,this.comparator,!0)}}class Jc{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ct{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??Ct.RED,this.left=i??Ct.EMPTY,this.right=s??Ct.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new Ct(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ct.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Ct.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ct.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ct.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw re();const e=this.left.check();if(e!==this.right.check())throw re();return e+(this.isRed()?0:1)}}Ct.EMPTY=null,Ct.RED=!0,Ct.BLACK=!1;Ct.EMPTY=new class{constructor(){this.size=0}get key(){throw re()}get value(){throw re()}get color(){throw re()}get left(){throw re()}get right(){throw re()}copy(e,t,r,i,s){return this}insert(e,t,r){return new Ct(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.comparator=e,this.data=new qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new t_(this.data.getIterator())}getIteratorFrom(e){return new t_(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof Le)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Le(this.comparator);return t.data=e,t}}class t_{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Ts(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e){this.fields=e,e.sort(Ke.comparator)}static empty(){return new en([])}unionWith(e){let t=new Le(Ke.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new en(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return zs(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
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
 */class hE extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xC(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new hE("Invalid base64 string: "+s):s}})(e);return new tt(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s})(e);return new tt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return me(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}tt.EMPTY_BYTE_STRING=new tt("");const LC=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Tr(n){if(se(!!n),typeof n=="string"){let e=0;const t=LC.exec(n);if(se(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:We(n.seconds),nanos:We(n.nanos)}}function We(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function wr(n){return typeof n=="string"?tt.fromBase64String(n):tt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function El(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Tl(n){const e=n.mapValue.fields.__previous_value__;return El(e)?Tl(e):e}function ja(n){const e=Tr(n.mapValue.fields.__local_write_time__.timestampValue);return new Je(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MC{constructor(e,t,r,i,s,o,a,c,l){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l}}class ui{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new ui("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ui&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},du={nullValue:"NULL_VALUE"};function li(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?El(n)?4:dE(n)?9007199254740991:wl(n)?10:11:re()}function Qn(n,e){if(n===e)return!0;const t=li(n);if(t!==li(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ja(n).isEqual(ja(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Tr(i.timestampValue),a=Tr(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,s){return wr(i.bytesValue).isEqual(wr(s.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,s){return We(i.geoPointValue.latitude)===We(s.geoPointValue.latitude)&&We(i.geoPointValue.longitude)===We(s.geoPointValue.longitude)})(n,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return We(i.integerValue)===We(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=We(i.doubleValue),a=We(s.doubleValue);return o===a?qa(o)===qa(a):isNaN(o)&&isNaN(a)}return!1})(n,e);case 9:return zs(n.arrayValue.values||[],e.arrayValue.values||[],Qn);case 10:case 11:return(function(i,s){const o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(e_(o)!==e_(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!Qn(o[c],a[c])))return!1;return!0})(n,e);default:return re()}}function Ga(n,e){return(n.values||[]).find((t=>Qn(t,e)))!==void 0}function hi(n,e){if(n===e)return 0;const t=li(n),r=li(e);if(t!==r)return me(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return me(n.booleanValue,e.booleanValue);case 2:return(function(s,o){const a=We(s.integerValue||s.doubleValue),c=We(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1})(n,e);case 3:return n_(n.timestampValue,e.timestampValue);case 4:return n_(ja(n),ja(e));case 5:return me(n.stringValue,e.stringValue);case 6:return(function(s,o){const a=wr(s),c=wr(o);return a.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(s,o){const a=s.split("/"),c=o.split("/");for(let l=0;l<a.length&&l<c.length;l++){const h=me(a[l],c[l]);if(h!==0)return h}return me(a.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(s,o){const a=me(We(s.latitude),We(o.latitude));return a!==0?a:me(We(s.longitude),We(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return r_(n.arrayValue,e.arrayValue);case 10:return(function(s,o){var a,c,l,h;const f=s.fields||{},m=o.fields||{},g=(a=f.value)===null||a===void 0?void 0:a.arrayValue,b=(c=m.value)===null||c===void 0?void 0:c.arrayValue,R=me(((l=g==null?void 0:g.values)===null||l===void 0?void 0:l.length)||0,((h=b==null?void 0:b.values)===null||h===void 0?void 0:h.length)||0);return R!==0?R:r_(g,b)})(n.mapValue,e.mapValue);case 11:return(function(s,o){if(s===Xr.mapValue&&o===Xr.mapValue)return 0;if(s===Xr.mapValue)return 1;if(o===Xr.mapValue)return-1;const a=s.fields||{},c=Object.keys(a),l=o.fields||{},h=Object.keys(l);c.sort(),h.sort();for(let f=0;f<c.length&&f<h.length;++f){const m=me(c[f],h[f]);if(m!==0)return m;const g=hi(a[c[f]],l[h[f]]);if(g!==0)return g}return me(c.length,h.length)})(n.mapValue,e.mapValue);default:throw re()}}function n_(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return me(n,e);const t=Tr(n),r=Tr(e),i=me(t.seconds,r.seconds);return i!==0?i:me(t.nanos,r.nanos)}function r_(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=hi(t[i],r[i]);if(s)return s}return me(t.length,r.length)}function Qs(n){return Rd(n)}function Rd(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Tr(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return wr(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return Z.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Rd(s);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Rd(t.fields[o])}`;return i+"}"})(n.mapValue):re()}function fu(n){switch(li(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Tl(n);return e?16+fu(e):16;case 5:return 2*n.stringValue.length;case 6:return wr(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((i,s)=>i+fu(s)),0)})(n.arrayValue);case 10:case 11:return(function(r){let i=0;return vi(r.fields,((s,o)=>{i+=s.length+fu(o)})),i})(n.mapValue);default:throw re()}}function es(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Sd(n){return!!n&&"integerValue"in n}function Ka(n){return!!n&&"arrayValue"in n}function i_(n){return!!n&&"nullValue"in n}function s_(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function pu(n){return!!n&&"mapValue"in n}function wl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function va(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return vi(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=va(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=va(n.arrayValue.values[t]);return e}return Object.assign({},n)}function dE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const fE={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function FC(n){return"nullValue"in n?du:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?es(ui.empty(),Z.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?wl(n)?fE:{mapValue:{}}:re()}function UC(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?es(ui.empty(),Z.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?fE:"mapValue"in n?wl(n)?{mapValue:{}}:Xr:re()}function o_(n,e){const t=hi(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function a_(n,e){const t=hi(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.value=e}static empty(){return new kt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!pu(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=va(t)}setAll(e){let t=Ke.emptyPath(),r={},i=[];e.forEach(((o,a)=>{if(!t.isImmediateParentOf(a)){const c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=va(o):i.push(a.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());pu(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Qn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];pu(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){vi(t,((i,s)=>e[i]=s));for(const i of r)delete e[i]}clone(){return new kt(va(this.value))}}function pE(n){const e=[];return vi(n.fields,((t,r)=>{const i=new Ke([t]);if(pu(r)){const s=pE(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)})),new en(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Ge(e,0,ae.min(),ae.min(),ae.min(),kt.empty(),0)}static newFoundDocument(e,t,r,i){return new Ge(e,1,t,ae.min(),r,i,0)}static newNoDocument(e,t){return new Ge(e,2,t,ae.min(),ae.min(),kt.empty(),0)}static newUnknownDocument(e,t){return new Ge(e,3,t,ae.min(),ae.min(),kt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(ae.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=kt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=kt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=ae.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ge&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ge(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class di{constructor(e,t){this.position=e,this.inclusive=t}}function c_(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=Z.comparator(Z.fromName(o.referenceValue),t.key):r=hi(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function u_(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Qn(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class $a{constructor(e,t="asc"){this.field=e,this.dir=t}}function BC(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class mE{}class be extends mE{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new qC(e,t,r):t==="array-contains"?new KC(e,r):t==="in"?new EE(e,r):t==="not-in"?new $C(e,r):t==="array-contains-any"?new zC(e,r):new be(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new jC(e,r):new GC(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(hi(t,this.value)):t!==null&&li(this.value)===li(t)&&this.matchesComparison(hi(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return re()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class xe extends mE{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new xe(e,t)}matches(e){return Js(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Js(n){return n.op==="and"}function Pd(n){return n.op==="or"}function Cf(n){return gE(n)&&Js(n)}function gE(n){for(const e of n.filters)if(e instanceof xe)return!1;return!0}function Cd(n){if(n instanceof be)return n.field.canonicalString()+n.op.toString()+Qs(n.value);if(Cf(n))return n.filters.map((e=>Cd(e))).join(",");{const e=n.filters.map((t=>Cd(t))).join(",");return`${n.op}(${e})`}}function _E(n,e){return n instanceof be?(function(r,i){return i instanceof be&&r.op===i.op&&r.field.isEqual(i.field)&&Qn(r.value,i.value)})(n,e):n instanceof xe?(function(r,i){return i instanceof xe&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce(((s,o,a)=>s&&_E(o,i.filters[a])),!0):!1})(n,e):void re()}function yE(n,e){const t=n.filters.concat(e);return xe.create(t,n.op)}function IE(n){return n instanceof be?(function(t){return`${t.field.canonicalString()} ${t.op} ${Qs(t.value)}`})(n):n instanceof xe?(function(t){return t.op.toString()+" {"+t.getFilters().map(IE).join(" ,")+"}"})(n):"Filter"}class qC extends be{constructor(e,t,r){super(e,t,r),this.key=Z.fromName(r.referenceValue)}matches(e){const t=Z.comparator(e.key,this.key);return this.matchesComparison(t)}}class jC extends be{constructor(e,t){super(e,"in",t),this.keys=vE("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class GC extends be{constructor(e,t){super(e,"not-in",t),this.keys=vE("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function vE(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((r=>Z.fromName(r.referenceValue)))}class KC extends be{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ka(t)&&Ga(t.arrayValue,this.value)}}class EE extends be{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ga(this.value.arrayValue,t)}}class $C extends be{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ga(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Ga(this.value.arrayValue,t)}}class zC extends be{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ka(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Ga(this.value.arrayValue,r)))}}/**
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
 */class HC{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.ue=null}}function Dd(n,e=null,t=[],r=[],i=null,s=null,o=null){return new HC(n,e,t,r,i,s,o)}function ts(n){const e=J(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>Cd(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(s){return s.field.canonicalString()+s.dir})(r))).join(","),cc(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Qs(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Qs(r))).join(",")),e.ue=t}return e.ue}function uc(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!BC(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!_E(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!u_(n.startAt,e.startAt)&&u_(n.endAt,e.endAt)}function Ou(n){return Z.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function xu(n,e){return n.filters.filter((t=>t instanceof be&&t.field.isEqual(e)))}function l_(n,e,t){let r=du,i=!0;for(const s of xu(n,e)){let o=du,a=!0;switch(s.op){case"<":case"<=":o=FC(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=du}o_({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];o_({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function h_(n,e,t){let r=Xr,i=!0;for(const s of xu(n,e)){let o=Xr,a=!0;switch(s.op){case">=":case">":o=UC(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=Xr}a_({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];a_({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function TE(n,e,t,r,i,s,o,a){return new Pr(n,e,t,r,i,s,o,a)}function mo(n){return new Pr(n)}function d_(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Df(n){return n.collectionGroup!==null}function Us(n){const e=J(n);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Le(Ke.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((l=>{l.isInequality()&&(a=a.add(l.field))}))})),a})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new $a(s,r))})),t.has(Ke.keyField().canonicalString())||e.ce.push(new $a(Ke.keyField(),r))}return e.ce}function Gt(n){const e=J(n);return e.le||(e.le=AE(e,Us(n))),e.le}function wE(n){const e=J(n);return e.he||(e.he=AE(e,n.explicitOrderBy)),e.he}function AE(n,e){if(n.limitType==="F")return Dd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new $a(i.field,s)}));const t=n.endAt?new di(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new di(n.startAt.position,n.startAt.inclusive):null;return Dd(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function kd(n,e){const t=n.filters.concat([e]);return new Pr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Lu(n,e,t){return new Pr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function lc(n,e){return uc(Gt(n),Gt(e))&&n.limitType===e.limitType}function bE(n){return`${ts(Gt(n))}|lt:${n.limitType}`}function Ds(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((i=>IE(i))).join(", ")}]`),cc(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((i=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(i))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((i=>Qs(i))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((i=>Qs(i))).join(",")),`Target(${r})`})(Gt(n))}; limitType=${n.limitType})`}function hc(n,e){return e.isFoundDocument()&&(function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):Z.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)})(n,e)&&(function(r,i){for(const s of Us(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(n,e)&&(function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0})(n,e)&&(function(r,i){return!(r.startAt&&!(function(o,a,c){const l=c_(o,a,c);return o.inclusive?l<=0:l<0})(r.startAt,Us(r),i)||r.endAt&&!(function(o,a,c){const l=c_(o,a,c);return o.inclusive?l>=0:l>0})(r.endAt,Us(r),i))})(n,e)}function RE(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function SE(n){return(e,t)=>{let r=!1;for(const i of Us(n)){const s=WC(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function WC(n,e,t){const r=n.field.isKeyField()?Z.comparator(e.key,t.key):(function(s,o,a){const c=o.data.field(s),l=a.data.field(s);return c!==null&&l!==null?hi(c,l):re()})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return re()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){vi(this.inner,((t,r)=>{for(const[i,s]of r)e(i,s)}))}isEmpty(){return lE(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QC=new qe(Z.comparator);function tn(){return QC}const PE=new qe(Z.comparator);function aa(...n){let e=PE;for(const t of n)e=e.insert(t.key,t);return e}function CE(n){let e=PE;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function jn(){return Ea()}function DE(){return Ea()}function Ea(){return new Cr((n=>n.toString()),((n,e)=>n.isEqual(e)))}const JC=new qe(Z.comparator),YC=new Le(Z.comparator);function Ie(...n){let e=YC;for(const t of n)e=e.add(t);return e}const XC=new Le(me);function kf(){return XC}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qa(e)?"-0":e}}function kE(n){return{integerValue:""+n}}function NE(n,e){return iE(e)?kE(e):Nf(n,e)}/**
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
 */class Al{constructor(){this._=void 0}}function ZC(n,e,t){return n instanceof Ys?(function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&El(s)&&(s=Tl(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}})(t,e):n instanceof ns?OE(n,e):n instanceof rs?xE(n,e):(function(i,s){const o=VE(i,s),a=f_(o)+f_(i.Pe);return Sd(o)&&Sd(i.Pe)?kE(a):Nf(i.serializer,a)})(n,e)}function eD(n,e,t){return n instanceof ns?OE(n,e):n instanceof rs?xE(n,e):t}function VE(n,e){return n instanceof Xs?(function(r){return Sd(r)||(function(s){return!!s&&"doubleValue"in s})(r)})(e)?e:{integerValue:0}:null}class Ys extends Al{}class ns extends Al{constructor(e){super(),this.elements=e}}function OE(n,e){const t=LE(e);for(const r of n.elements)t.some((i=>Qn(i,r)))||t.push(r);return{arrayValue:{values:t}}}class rs extends Al{constructor(e){super(),this.elements=e}}function xE(n,e){let t=LE(e);for(const r of n.elements)t=t.filter((i=>!Qn(i,r)));return{arrayValue:{values:t}}}class Xs extends Al{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function f_(n){return We(n.integerValue||n.doubleValue)}function LE(n){return Ka(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e,t){this.field=e,this.transform=t}}function tD(n,e){return n.field.isEqual(e.field)&&(function(r,i){return r instanceof ns&&i instanceof ns||r instanceof rs&&i instanceof rs?zs(r.elements,i.elements,Qn):r instanceof Xs&&i instanceof Xs?Qn(r.Pe,i.Pe):r instanceof Ys&&i instanceof Ys})(n.transform,e.transform)}class nD{constructor(e,t){this.version=e,this.transformResults=t}}class Qe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Qe}static exists(e){return new Qe(void 0,e)}static updateTime(e){return new Qe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function mu(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class bl{}function ME(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new _o(n.key,Qe.none()):new go(n.key,n.data,Qe.none());{const t=n.data,r=kt.empty();let i=new Le(Ke.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Dr(n.key,r,new en(i.toArray()),Qe.none())}}function rD(n,e,t){n instanceof go?(function(i,s,o){const a=i.value.clone(),c=m_(i.fieldTransforms,s,o.transformResults);a.setAll(c),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()})(n,e,t):n instanceof Dr?(function(i,s,o){if(!mu(i.precondition,s))return void s.convertToUnknownDocument(o.version);const a=m_(i.fieldTransforms,s,o.transformResults),c=s.data;c.setAll(FE(i)),c.setAll(a),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):(function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Ta(n,e,t,r){return n instanceof go?(function(s,o,a,c){if(!mu(s.precondition,o))return a;const l=s.value.clone(),h=g_(s.fieldTransforms,c,o);return l.setAll(h),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null})(n,e,t,r):n instanceof Dr?(function(s,o,a,c){if(!mu(s.precondition,o))return a;const l=g_(s.fieldTransforms,c,o),h=o.data;return h.setAll(FE(s)),h.setAll(l),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((f=>f.field)))})(n,e,t,r):(function(s,o,a){return mu(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a})(n,e,t)}function iD(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=VE(r.transform,i||null);s!=null&&(t===null&&(t=kt.empty()),t.set(r.field,s))}return t||null}function p_(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&zs(r,i,((s,o)=>tD(s,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class go extends bl{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Dr extends bl{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function FE(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function m_(n,e,t){const r=new Map;se(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,eD(o,a,t[i]))}return r}function g_(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,ZC(s,o,e))}return r}class _o extends bl{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Vf extends bl{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Of{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&rD(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Ta(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Ta(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=DE();return this.mutations.forEach((i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;const c=ME(o,a);c!==null&&r.set(i.key,c),o.isValidDocument()||o.convertToNoDocument(ae.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Ie())}isEqual(e){return this.batchId===e.batchId&&zs(this.mutations,e.mutations,((t,r)=>p_(t,r)))&&zs(this.baseMutations,e.baseMutations,((t,r)=>p_(t,r)))}}class xf{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){se(e.mutations.length===r.length);let i=(function(){return JC})();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new xf(e,t,r,i)}}/**
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
 */class Lf{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class UE{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sD{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pt,Re;function BE(n){switch(n){default:return re();case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0}}function qE(n){if(n===void 0)return lt("GRPC error has no .code"),L.UNKNOWN;switch(n){case pt.OK:return L.OK;case pt.CANCELLED:return L.CANCELLED;case pt.UNKNOWN:return L.UNKNOWN;case pt.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case pt.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case pt.INTERNAL:return L.INTERNAL;case pt.UNAVAILABLE:return L.UNAVAILABLE;case pt.UNAUTHENTICATED:return L.UNAUTHENTICATED;case pt.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case pt.NOT_FOUND:return L.NOT_FOUND;case pt.ALREADY_EXISTS:return L.ALREADY_EXISTS;case pt.PERMISSION_DENIED:return L.PERMISSION_DENIED;case pt.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case pt.ABORTED:return L.ABORTED;case pt.OUT_OF_RANGE:return L.OUT_OF_RANGE;case pt.UNIMPLEMENTED:return L.UNIMPLEMENTED;case pt.DATA_LOSS:return L.DATA_LOSS;default:return re()}}(Re=pt||(pt={}))[Re.OK=0]="OK",Re[Re.CANCELLED=1]="CANCELLED",Re[Re.UNKNOWN=2]="UNKNOWN",Re[Re.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Re[Re.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Re[Re.NOT_FOUND=5]="NOT_FOUND",Re[Re.ALREADY_EXISTS=6]="ALREADY_EXISTS",Re[Re.PERMISSION_DENIED=7]="PERMISSION_DENIED",Re[Re.UNAUTHENTICATED=16]="UNAUTHENTICATED",Re[Re.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Re[Re.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Re[Re.ABORTED=10]="ABORTED",Re[Re.OUT_OF_RANGE=11]="OUT_OF_RANGE",Re[Re.UNIMPLEMENTED=12]="UNIMPLEMENTED",Re[Re.INTERNAL=13]="INTERNAL",Re[Re.UNAVAILABLE=14]="UNAVAILABLE",Re[Re.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let Mu=null;/**
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
 */function jE(){return new TextEncoder}/**
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
 */const oD=new Qi([4294967295,4294967295],0);function __(n){const e=jE().encode(n),t=new Gv;return t.update(e),new Uint8Array(t.digest())}function y_(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Qi([t,r],0),new Qi([i,s],0)]}class Mf{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new ca(`Invalid padding: ${t}`);if(r<0)throw new ca(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new ca(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new ca(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Qi.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(Qi.fromNumber(r)));return i.compare(oD)===1&&(i=new Qi([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=__(e),[r,i]=y_(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Mf(s,i,t);return r.forEach((a=>o.insert(a))),o}insert(e){if(this.Ie===0)return;const t=__(e),[r,i]=y_(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class ca extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class gu{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class GE{constructor(e,t){this.targetId=e,this.me=t}}class KE{constructor(e,t,r=tt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class I_{constructor(){this.fe=0,this.ge=E_(),this.pe=tt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Ie(),t=Ie(),r=Ie();return this.ge.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:re()}})),new pc(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=E_()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,se(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class aD{constructor(e){this.Le=e,this.Be=new Map,this.ke=tn(),this.qe=v_(),this.Qe=new qe(me)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,(t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:re()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach(((r,i)=>{this.ze(i)&&t(i)}))}He(e){const t=e.targetId,r=e.me.count,i=this.Je(t);if(i){const s=i.target;if(Ou(s))if(r===0){const o=new Z(s.path);this.Ue(t,o,Ge.newNoDocument(o,ae.min()))}else se(r===1);else{const o=this.Ye(t);if(o!==r){const a=this.Ze(e),c=a?this.Xe(a,e,o):1;if(c!==0){this.je(t);const l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,l)}Mu==null||Mu.et((function(h,f,m,g,b){var R,C,V,D,x,M;const H={localCacheCount:h,existenceFilterCount:f.count,databaseId:m.database,projectId:m.projectId},j=f.unchangedNames;return j&&(H.bloomFilter={applied:b===0,hashCount:(R=j==null?void 0:j.hashCount)!==null&&R!==void 0?R:0,bitmapLength:(D=(V=(C=j==null?void 0:j.bits)===null||C===void 0?void 0:C.bitmap)===null||V===void 0?void 0:V.length)!==null&&D!==void 0?D:0,padding:(M=(x=j==null?void 0:j.bits)===null||x===void 0?void 0:x.padding)!==null&&M!==void 0?M:0,mightContain:E=>{var _;return(_=g==null?void 0:g.mightContain(E))!==null&&_!==void 0&&_}}),H})(o,e.me,this.Le.tt(),a,c))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,a;try{o=wr(r).toUint8Array()}catch(c){if(c instanceof hE)return mn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new Mf(o,i,s)}catch(c){return mn(c instanceof ca?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.Ie===0?null:a}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let i=0;return r.forEach((s=>{const o=this.Le.tt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.Ue(t,s,null),i++)})),i}rt(e){const t=new Map;this.Be.forEach(((s,o)=>{const a=this.Je(o);if(a){if(s.current&&Ou(a.target)){const c=new Z(a.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,Ge.newNoDocument(c,e))}s.be&&(t.set(o,s.ve()),s.Ce())}}));let r=Ie();this.qe.forEach(((s,o)=>{let a=!0;o.forEachWhile((c=>{const l=this.Je(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(r=r.add(s))})),this.ke.forEach(((s,o)=>o.setReadTime(e)));const i=new fc(e,t,this.Qe,this.ke,r);return this.ke=tn(),this.qe=v_(),this.Qe=new qe(me),i}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new I_,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Le(me),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||$("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new I_),this.Le.getRemoteKeysForTarget(e).forEach((t=>{this.Ue(e,t,null)}))}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function v_(){return new qe(Z.comparator)}function E_(){return new qe(Z.comparator)}const cD={asc:"ASCENDING",desc:"DESCENDING"},uD={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},lD={and:"AND",or:"OR"};class hD{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Nd(n,e){return n.useProto3Json||cc(e)?e:{value:e}}function Zs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function $E(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function dD(n,e){return Zs(n,e.toTimestamp())}function dt(n){return se(!!n),ae.fromTimestamp((function(t){const r=Tr(t);return new Je(r.seconds,r.nanos)})(n))}function Ff(n,e){return Vd(n,e).canonicalString()}function Vd(n,e){const t=(function(i){return new Ae(["projects",i.projectId,"databases",i.database])})(n).child("documents");return e===void 0?t:t.child(e)}function zE(n){const e=Ae.fromString(n);return se(nT(e)),e}function za(n,e){return Ff(n.databaseId,e.path)}function Wn(n,e){const t=zE(e);if(t.get(1)!==n.databaseId.projectId)throw new K(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new K(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new Z(QE(t))}function HE(n,e){return Ff(n.databaseId,e)}function WE(n){const e=zE(n);return e.length===4?Ae.emptyPath():QE(e)}function Od(n){return new Ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function QE(n){return se(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function T_(n,e,t){return{name:za(n,e),fields:t.value.mapValue.fields}}function JE(n,e,t){const r=Wn(n,e.name),i=dt(e.updateTime),s=e.createTime?dt(e.createTime):ae.min(),o=new kt({mapValue:{fields:e.fields}}),a=Ge.newFoundDocument(r,i,s,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function fD(n,e){return"found"in e?(function(r,i){se(!!i.found),i.found.name,i.found.updateTime;const s=Wn(r,i.found.name),o=dt(i.found.updateTime),a=i.found.createTime?dt(i.found.createTime):ae.min(),c=new kt({mapValue:{fields:i.found.fields}});return Ge.newFoundDocument(s,o,a,c)})(n,e):"missing"in e?(function(r,i){se(!!i.missing),se(!!i.readTime);const s=Wn(r,i.missing),o=dt(i.readTime);return Ge.newNoDocument(s,o)})(n,e):re()}function pD(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:re()})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(l,h){return l.useProto3Json?(se(h===void 0||typeof h=="string"),tt.fromBase64String(h||"")):(se(h===void 0||h instanceof Buffer||h instanceof Uint8Array),tt.fromUint8Array(h||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&(function(l){const h=l.code===void 0?L.UNKNOWN:qE(l.code);return new K(h,l.message||"")})(o);t=new KE(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Wn(n,r.document.name),s=dt(r.document.updateTime),o=r.document.createTime?dt(r.document.createTime):ae.min(),a=new kt({mapValue:{fields:r.document.fields}}),c=Ge.newFoundDocument(i,s,o,a),l=r.targetIds||[],h=r.removedTargetIds||[];t=new gu(l,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Wn(n,r.document),s=r.readTime?dt(r.readTime):ae.min(),o=Ge.newNoDocument(i,s),a=r.removedTargetIds||[];t=new gu([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Wn(n,r.document),s=r.removedTargetIds||[];t=new gu([],s,i,null)}else{if(!("filter"in e))return re();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new sD(i,s),a=r.targetId;t=new GE(a,o)}}return t}function Ha(n,e){let t;if(e instanceof go)t={update:T_(n,e.key,e.value)};else if(e instanceof _o)t={delete:za(n,e.key)};else if(e instanceof Dr)t={update:T_(n,e.key,e.data),updateMask:vD(e.fieldMask)};else{if(!(e instanceof Vf))return re();t={verify:za(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(s,o){const a=o.transform;if(a instanceof Ys)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof ns)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof rs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Xs)return{fieldPath:o.field.canonicalString(),increment:a.Pe};throw re()})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:dD(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:re()})(n,e.precondition)),t}function xd(n,e){const t=e.currentDocument?(function(s){return s.updateTime!==void 0?Qe.updateTime(dt(s.updateTime)):s.exists!==void 0?Qe.exists(s.exists):Qe.none()})(e.currentDocument):Qe.none(),r=e.updateTransforms?e.updateTransforms.map((i=>(function(o,a){let c=null;if("setToServerValue"in a)se(a.setToServerValue==="REQUEST_TIME"),c=new Ys;else if("appendMissingElements"in a){const h=a.appendMissingElements.values||[];c=new ns(h)}else if("removeAllFromArray"in a){const h=a.removeAllFromArray.values||[];c=new rs(h)}else"increment"in a?c=new Xs(o,a.increment):re();const l=Ke.fromServerFormat(a.fieldPath);return new dc(l,c)})(n,i))):[];if(e.update){e.update.name;const i=Wn(n,e.update.name),s=new kt({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(c){const l=c.fieldPaths||[];return new en(l.map((h=>Ke.fromServerFormat(h))))})(e.updateMask);return new Dr(i,s,o,t,r)}return new go(i,s,t,r)}if(e.delete){const i=Wn(n,e.delete);return new _o(i,t)}if(e.verify){const i=Wn(n,e.verify);return new Vf(i,t)}return re()}function mD(n,e){return n&&n.length>0?(se(e!==void 0),n.map((t=>(function(i,s){let o=i.updateTime?dt(i.updateTime):dt(s);return o.isEqual(ae.min())&&(o=dt(s)),new nD(o,i.transformResults||[])})(t,e)))):[]}function YE(n,e){return{documents:[HE(n,e.path)]}}function Rl(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=HE(n,i);const s=(function(l){if(l.length!==0)return tT(xe.create(l,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const o=(function(l){if(l.length!==0)return l.map((h=>(function(m){return{field:Wr(m.field),direction:_D(m.dir)}})(h)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=Nd(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=(function(l){return{before:l.inclusive,values:l.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(l){return{before:!l.inclusive,values:l.position}})(e.endAt)),{_t:t,parent:i}}function XE(n,e,t,r){const{_t:i,parent:s}=Rl(n,e),o={},a=[];let c=0;return t.forEach((l=>{const h=r?l.alias:"aggregate_"+c++;o[h]=l.alias,l.aggregateType==="count"?a.push({alias:h,count:{}}):l.aggregateType==="avg"?a.push({alias:h,avg:{field:Wr(l.fieldPath)}}):l.aggregateType==="sum"&&a.push({alias:h,sum:{field:Wr(l.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:i.structuredQuery},parent:i.parent},ut:o,parent:s}}function ZE(n){let e=WE(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){se(r===1);const h=t.from[0];h.allDescendants?i=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=(function(f){const m=eT(f);return m instanceof xe&&Cf(m)?m.getFilters():[m]})(t.where));let o=[];t.orderBy&&(o=(function(f){return f.map((m=>(function(b){return new $a(ks(b.field),(function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(b.direction))})(m)))})(t.orderBy));let a=null;t.limit&&(a=(function(f){let m;return m=typeof f=="object"?f.value:f,cc(m)?null:m})(t.limit));let c=null;t.startAt&&(c=(function(f){const m=!!f.before,g=f.values||[];return new di(g,m)})(t.startAt));let l=null;return t.endAt&&(l=(function(f){const m=!f.before,g=f.values||[];return new di(g,m)})(t.endAt)),TE(e,i,o,s,a,"F",c,l)}function gD(n,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return re()}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function eT(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=ks(t.unaryFilter.field);return be.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ks(t.unaryFilter.field);return be.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ks(t.unaryFilter.field);return be.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ks(t.unaryFilter.field);return be.create(o,"!=",{nullValue:"NULL_VALUE"});default:return re()}})(n):n.fieldFilter!==void 0?(function(t){return be.create(ks(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return re()}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return xe.create(t.compositeFilter.filters.map((r=>eT(r))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return re()}})(t.compositeFilter.op))})(n):re()}function _D(n){return cD[n]}function yD(n){return uD[n]}function ID(n){return lD[n]}function Wr(n){return{fieldPath:n.canonicalString()}}function ks(n){return Ke.fromServerFormat(n.fieldPath)}function tT(n){return n instanceof be?(function(t){if(t.op==="=="){if(s_(t.value))return{unaryFilter:{field:Wr(t.field),op:"IS_NAN"}};if(i_(t.value))return{unaryFilter:{field:Wr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(s_(t.value))return{unaryFilter:{field:Wr(t.field),op:"IS_NOT_NAN"}};if(i_(t.value))return{unaryFilter:{field:Wr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wr(t.field),op:yD(t.op),value:t.value}}})(n):n instanceof xe?(function(t){const r=t.getFilters().map((i=>tT(i)));return r.length===1?r[0]:{compositeFilter:{op:ID(t.op),filters:r}}})(n):re()}function vD(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function nT(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class rT{constructor(e){this.ct=e}}function ED(n,e){let t;if(e.document)t=JE(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=Z.fromSegments(e.noDocument.path),i=ss(e.noDocument.readTime);t=Ge.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return re();{const r=Z.fromSegments(e.unknownDocument.path),i=ss(e.unknownDocument.version);t=Ge.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime((function(i){const s=new Je(i[0],i[1]);return ae.fromTimestamp(s)})(e.readTime)),t}function w_(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Fu(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(s,o){return{name:za(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Zs(s,o.version.toTimestamp()),createTime:Zs(s,o.createTime.toTimestamp())}})(n.ct,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:is(e.version)};else{if(!e.isUnknownDocument())return re();r.unknownDocument={path:t.path.toArray(),version:is(e.version)}}return r}function Fu(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function is(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function ss(n){const e=new Je(n.seconds,n.nanoseconds);return ae.fromTimestamp(e)}function qi(n,e){const t=(e.baseMutations||[]).map((s=>xd(n.ct,s)));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map((s=>xd(n.ct,s))),i=Je.fromMillis(e.localWriteTimeMs);return new Of(e.batchId,i,t,r)}function ua(n){const e=ss(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?ss(n.lastLimboFreeSnapshotVersion):ae.min();let r;return r=(function(s){return s.documents!==void 0})(n.query)?(function(s){return se(s.documents.length===1),Gt(mo(WE(s.documents[0])))})(n.query):(function(s){return Gt(ZE(s))})(n.query),new dr(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,tt.fromBase64String(n.resumeToken))}function iT(n,e){const t=is(e.snapshotVersion),r=is(e.lastLimboFreeSnapshotVersion);let i;i=Ou(e.target)?YE(n.ct,e.target):Rl(n.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:ts(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function Uf(n){const e=ZE({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Lu(e,e.limit,"L"):e}function Lh(n,e){return new Lf(e.largestBatchId,xd(n.ct,e.overlayMutation))}function A_(n,e){const t=e.path.lastSegment();return[n,jt(e.path.popLast()),t]}function b_(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:is(r.readTime),documentKey:jt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TD{getBundleMetadata(e,t){return R_(e).get(t).next((r=>{if(r)return(function(s){return{id:s.bundleId,createTime:ss(s.createTime),version:s.version}})(r)}))}saveBundleMetadata(e,t){return R_(e).put((function(i){return{bundleId:i.id,createTime:is(dt(i.createTime)),version:i.version}})(t))}getNamedQuery(e,t){return S_(e).get(t).next((r=>{if(r)return(function(s){return{name:s.name,query:Uf(s.bundledQuery),readTime:ss(s.readTime)}})(r)}))}saveNamedQuery(e,t){return S_(e).put((function(i){return{name:i.name,readTime:is(dt(i.readTime)),bundledQuery:i.bundledQuery}})(t))}}function R_(n){return Et(n,"bundles")}function S_(n){return Et(n,"namedQueries")}/**
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
 */class Sl{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const r=t.uid||"";return new Sl(e,r)}getOverlay(e,t){return Ho(e).get(A_(this.userId,t)).next((r=>r?Lh(this.serializer,r):null))}getOverlays(e,t){const r=jn();return N.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){const i=[];return r.forEach(((s,o)=>{const a=new Lf(t,o);i.push(this.ht(e,a))})),N.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach((o=>i.add(jt(o.getCollectionPath()))));const s=[];return i.forEach((o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Ho(e).j("collectionPathOverlayIndex",a))})),N.waitFor(s)}getOverlaysForCollection(e,t,r){const i=jn(),s=jt(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Ho(e).U("collectionPathOverlayIndex",o).next((a=>{for(const c of a){const l=Lh(this.serializer,c);i.set(l.getKey(),l)}return i}))}getOverlaysForCollectionGroup(e,t,r,i){const s=jn();let o;const a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Ho(e).J({index:"collectionGroupOverlayIndex",range:a},((c,l,h)=>{const f=Lh(this.serializer,l);s.size()<i||f.largestBatchId===o?(s.set(f.getKey(),f),o=f.largestBatchId):h.done()})).next((()=>s))}ht(e,t){return Ho(e).put((function(i,s,o){const[a,c,l]=A_(s,o.mutation.key);return{userId:s,collectionPath:c,documentId:l,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Ha(i.ct,o.mutation)}})(this.serializer,this.userId,t))}}function Ho(n){return Et(n,"documentOverlays")}/**
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
 */class wD{Pt(e){return Et(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next((t=>{const r=t==null?void 0:t.value;return r?tt.fromUint8Array(r):tt.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class ji{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(We(e.integerValue));else if("doubleValue"in e){const r=We(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),qa(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),typeof r=="string"&&(r=Tr(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(wr(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?dE(e)?this.dt(t,Number.MAX_SAFE_INTEGER):wl(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):re()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const r=e.fields||{};this.dt(t,55);for(const i of Object.keys(r))this.Vt(i,t),this.Tt(r[i],t)}wt(e,t){var r,i;const s=e.fields||{};this.dt(t,53);const o="value",a=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(We(a)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const r=e.values||[];this.dt(t,50);for(const i of r)this.Tt(i,t)}yt(e,t){this.dt(t,37),Z.fromName(e).path.forEach((r=>{this.dt(t,60),this.Dt(r,t)}))}dt(e,t){e.At(t)}ft(e){e.At(2)}}ji.vt=new ji;function AD(n){if(n===0)return 8;let e=0;return n>>4==0&&(e+=4,n<<=4),n>>6==0&&(e+=2,n<<=2),n>>7==0&&(e+=1),e}function P_(n){const e=64-(function(r){let i=0;for(let s=0;s<8;++s){const o=AD(255&r[s]);if(i+=o,o!==8)break}return i})(n);return Math.ceil(e/8)}class bD{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ft(r.value),r=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ot(r.value),r=t.next();this.Nt()}Lt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ft(r);else if(r<2048)this.Ft(960|r>>>6),this.Ft(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|r>>>12),this.Ft(128|63&r>>>6),this.Ft(128|63&r);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ot(r);else if(r<2048)this.Ot(960|r>>>6),this.Ot(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|r>>>12),this.Ot(128|63&r>>>6),this.Ot(128|63&r);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),r=P_(t);this.Qt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),r=P_(t);this.Qt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=(function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)})(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class RD{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class SD{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Wo{constructor(){this.jt=new bD,this.Ht=new RD(this.jt),this.Jt=new SD(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class Gi{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new Gi(this.indexId,this.documentKey,this.arrayValue,r)}}function Br(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=C_(n.arrayValue,e.arrayValue),t!==0?t:(t=C_(n.directionalValue,e.directionalValue),t!==0?t:Z.comparator(n.documentKey,e.documentKey)))}function C_(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class D_{constructor(e){this.Xt=new Le(((t,r)=>Ke.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Xt=this.Xt.add(r):this.tn.push(r)}}get nn(){return this.Xt.size>1}rn(e){if(se(e.collectionGroup===this.collectionId),this.nn)return!1;const t=Ad(e);if(t!==void 0&&!this.sn(t))return!1;const r=Mi(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.sn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Xt.size>0){const a=this.Xt.getIterator().getNext();if(!i.has(a.field.canonicalString())){const c=r[s];if(!this.on(a,c)||!this._n(this.en[o++],c))return!1}++s}for(;s<r.length;++s){const a=r[s];if(o>=this.en.length||!this._n(this.en[o++],a))return!1}return!0}an(){if(this.nn)return null;let e=new Le(Ke.comparator);const t=[];for(const r of this.tn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Ji(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Ji(r.field,0))}for(const r of this.en)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Ji(r.field,r.dir==="asc"?0:1)));return new Hs(Hs.UNKNOWN_ID,this.collectionId,t,Ws.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function sT(n){var e,t;if(se(n instanceof be||n instanceof xe),n instanceof be){if(n instanceof EE){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map((s=>be.create(n.field,"==",s))))||[];return xe.create(i,"or")}return n}const r=n.filters.map((i=>sT(i)));return xe.create(r,n.op)}function PD(n){if(n.getFilters().length===0)return[];const e=Fd(sT(n));return se(oT(e)),Ld(e)||Md(e)?[e]:e.getFilters()}function Ld(n){return n instanceof be}function Md(n){return n instanceof xe&&Cf(n)}function oT(n){return Ld(n)||Md(n)||(function(t){if(t instanceof xe&&Pd(t)){for(const r of t.getFilters())if(!Ld(r)&&!Md(r))return!1;return!0}return!1})(n)}function Fd(n){if(se(n instanceof be||n instanceof xe),n instanceof be)return n;if(n.filters.length===1)return Fd(n.filters[0]);const e=n.filters.map((r=>Fd(r)));let t=xe.create(e,n.op);return t=Uu(t),oT(t)?t:(se(t instanceof xe),se(Js(t)),se(t.filters.length>1),t.filters.reduce(((r,i)=>Bf(r,i))))}function Bf(n,e){let t;return se(n instanceof be||n instanceof xe),se(e instanceof be||e instanceof xe),t=n instanceof be?e instanceof be?(function(i,s){return xe.create([i,s],"and")})(n,e):k_(n,e):e instanceof be?k_(e,n):(function(i,s){if(se(i.filters.length>0&&s.filters.length>0),Js(i)&&Js(s))return yE(i,s.getFilters());const o=Pd(i)?i:s,a=Pd(i)?s:i,c=o.filters.map((l=>Bf(l,a)));return xe.create(c,"or")})(n,e),Uu(t)}function k_(n,e){if(Js(e))return yE(e,n.getFilters());{const t=e.filters.map((r=>Bf(n,r)));return xe.create(t,"or")}}function Uu(n){if(se(n instanceof be||n instanceof xe),n instanceof be)return n;const e=n.getFilters();if(e.length===1)return Uu(e[0]);if(gE(n))return n;const t=e.map((i=>Uu(i))),r=[];return t.forEach((i=>{i instanceof be?r.push(i):i instanceof xe&&(i.op===n.op?r.push(...i.filters):r.push(i))})),r.length===1?r[0]:xe.create(r,n.op)}/**
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
 */class CD{constructor(){this.un=new qf}addToCollectionParentIndex(e,t){return this.un.add(t),N.resolve()}getCollectionParents(e,t){return N.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return N.resolve()}deleteFieldIndex(e,t){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,t){return N.resolve()}getDocumentsMatchingTarget(e,t){return N.resolve(null)}getIndexType(e,t){return N.resolve(0)}getFieldIndexes(e,t){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,t){return N.resolve(gn.min())}getMinOffsetFromCollectionGroup(e,t){return N.resolve(gn.min())}updateCollectionGroup(e,t,r){return N.resolve()}updateIndexEntries(e,t){return N.resolve()}}class qf{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Le(Ae.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Le(Ae.comparator)).toArray()}}/**
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
 */const Yc=new Uint8Array(0);class DD{constructor(e,t){this.databaseId=t,this.cn=new qf,this.ln=new Cr((r=>ts(r)),((r,i)=>uc(r,i))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener((()=>{this.cn.add(t)}));const s={collectionId:r,parent:jt(i)};return N_(e).put(s)}return N.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[Xv(t),""],!1,!0);return N_(e).U(i).next((s=>{for(const o of s){if(o.collectionId!==t)break;r.push(qn(o.parent))}return r}))}addFieldIndex(e,t){const r=Qo(e),i=(function(a){return{indexId:a.indexId,collectionGroup:a.collectionGroup,fields:a.fields.map((c=>[c.fieldPath.canonicalString(),c.kind]))}})(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=As(e);return s.next((a=>{o.put(b_(a,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return s.next()}deleteFieldIndex(e,t){const r=Qo(e),i=As(e),s=ws(e);return r.delete(t.indexId).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Qo(e),r=ws(e),i=As(e);return t.j().next((()=>r.j())).next((()=>i.j()))}createTargetIndexes(e,t){return N.forEach(this.hn(t),(r=>this.getIndexType(e,r).next((i=>{if(i===0||i===1){const s=new D_(r).an();if(s!=null)return this.addFieldIndex(e,s)}}))))}getDocumentsMatchingTarget(e,t){const r=ws(e);let i=!0;const s=new Map;return N.forEach(this.hn(t),(o=>this.Pn(e,o).next((a=>{i&&(i=!!a),s.set(o,a)})))).next((()=>{if(i){let o=Ie();const a=[];return N.forEach(s,((c,l)=>{$("IndexedDbIndexManager",`Using index ${(function(x){return`id=${x.indexId}|cg=${x.collectionGroup}|f=${x.fields.map((M=>`${M.fieldPath}:${M.kind}`)).join(",")}`})(c)} to execute ${ts(t)}`);const h=(function(x,M){const H=Ad(M);if(H===void 0)return null;for(const j of xu(x,H.fieldPath))switch(j.op){case"array-contains-any":return j.value.arrayValue.values||[];case"array-contains":return[j.value]}return null})(l,c),f=(function(x,M){const H=new Map;for(const j of Mi(M))for(const E of xu(x,j.fieldPath))switch(E.op){case"==":case"in":H.set(j.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return H.set(j.fieldPath.canonicalString(),E.value),Array.from(H.values())}return null})(l,c),m=(function(x,M){const H=[];let j=!0;for(const E of Mi(M)){const _=E.kind===0?l_(x,E.fieldPath,x.startAt):h_(x,E.fieldPath,x.startAt);H.push(_.value),j&&(j=_.inclusive)}return new di(H,j)})(l,c),g=(function(x,M){const H=[];let j=!0;for(const E of Mi(M)){const _=E.kind===0?h_(x,E.fieldPath,x.endAt):l_(x,E.fieldPath,x.endAt);H.push(_.value),j&&(j=_.inclusive)}return new di(H,j)})(l,c),b=this.In(c,l,m),R=this.In(c,l,g),C=this.Tn(c,l,f),V=this.En(c.indexId,h,b,m.inclusive,R,g.inclusive,C);return N.forEach(V,(D=>r.G(D,t.limit).next((x=>{x.forEach((M=>{const H=Z.fromSegments(M.documentKey);o.has(H)||(o=o.add(H),a.push(H))}))}))))})).next((()=>a))}return N.resolve(null)}))}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=PD(xe.create(e.filters,"and")).map((r=>Dd(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.ln.set(e,t),t)}En(e,t,r,i,s,o,a){const c=(t!=null?t.length:1)*Math.max(r.length,s.length),l=c/(t!=null?t.length:1),h=[];for(let f=0;f<c;++f){const m=t?this.dn(t[f/l]):Yc,g=this.An(e,m,r[f%l],i),b=this.Rn(e,m,s[f%l],o),R=a.map((C=>this.An(e,m,C,!0)));h.push(...this.createRange(g,b,R))}return h}An(e,t,r,i){const s=new Gi(e,Z.empty(),t,r);return i?s:s.Zt()}Rn(e,t,r,i){const s=new Gi(e,Z.empty(),t,r);return i?s.Zt():s}Pn(e,t){const r=new D_(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next((s=>{let o=null;for(const a of s)r.rn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o}))}getIndexType(e,t){let r=2;const i=this.hn(t);return N.forEach(i,(s=>this.Pn(e,s).next((o=>{o?r!==0&&o.fields.length<(function(c){let l=new Le(Ke.comparator),h=!1;for(const f of c.filters)for(const m of f.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?h=!0:l=l.add(m.field));for(const f of c.orderBy)f.field.isKeyField()||(l=l.add(f.field));return l.size+(h?1:0)})(s)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&i.length>1&&r===2?1:r))}Vn(e,t){const r=new Wo;for(const i of Mi(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.Yt(i.kind);ji.vt.It(s,o)}return r.zt()}dn(e){const t=new Wo;return ji.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const r=new Wo;return ji.vt.It(es(this.databaseId,t),r.Yt((function(s){const o=Mi(s);return o.length===0?0:o[o.length-1].kind})(e))),r.zt()}Tn(e,t,r){if(r===null)return[];let i=[];i.push(new Wo);let s=0;for(const o of Mi(e)){const a=r[s++];for(const c of i)if(this.fn(t,o.fieldPath)&&Ka(a))i=this.gn(i,o,a);else{const l=c.Yt(o.kind);ji.vt.It(a,l)}}return this.pn(i)}In(e,t,r){return this.Tn(e,t,r.position)}pn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].zt();return t}gn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const c=new Wo;c.seed(a.zt()),ji.vt.It(o,c.Yt(t.kind)),s.push(c)}return s}fn(e,t){return!!e.filters.find((r=>r instanceof be&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=Qo(e),i=As(e);return(t?r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.U()).next((s=>{const o=[];return N.forEach(s,(a=>i.get([a.indexId,this.uid]).next((c=>{o.push((function(h,f){const m=f?new Ws(f.sequenceNumber,new gn(ss(f.readTime),new Z(qn(f.documentKey)),f.largestBatchId)):Ws.empty(),g=h.fields.map((([b,R])=>new Ji(Ke.fromServerFormat(b),R)));return new Hs(h.indexId,h.collectionGroup,g,m)})(a,c))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:me(r.collectionGroup,i.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const i=Qo(e),s=As(e);return this.yn(e).next((o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next((a=>N.forEach(a,(c=>s.put(b_(c.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return N.forEach(t,((i,s)=>{const o=r.get(i.collectionGroup);return(o?N.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next((a=>(r.set(i.collectionGroup,a),N.forEach(a,(c=>this.wn(e,i,c).next((l=>{const h=this.Sn(s,c);return l.isEqual(h)?N.resolve():this.bn(e,s,c,l,h)})))))))}))}Dn(e,t,r,i){return ws(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(r,t.key),documentKey:t.key.path.toArray()})}vn(e,t,r,i){return ws(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(r,t.key),t.key.path.toArray()])}wn(e,t,r){const i=ws(e);let s=new Le(Br);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.mn(r,t)])},((o,a)=>{s=s.add(new Gi(r.indexId,t,a.arrayValue,a.directionalValue))})).next((()=>s))}Sn(e,t){let r=new Le(Br);const i=this.Vn(t,e);if(i==null)return r;const s=Ad(t);if(s!=null){const o=e.data.field(s.fieldPath);if(Ka(o))for(const a of o.arrayValue.values||[])r=r.add(new Gi(t.indexId,e.key,this.dn(a),i))}else r=r.add(new Gi(t.indexId,e.key,Yc,i));return r}bn(e,t,r,i,s){$("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return(function(c,l,h,f,m){const g=c.getIterator(),b=l.getIterator();let R=Ts(g),C=Ts(b);for(;R||C;){let V=!1,D=!1;if(R&&C){const x=h(R,C);x<0?D=!0:x>0&&(V=!0)}else R!=null?D=!0:V=!0;V?(f(C),C=Ts(b)):D?(m(R),R=Ts(g)):(R=Ts(g),C=Ts(b))}})(i,s,Br,(a=>{o.push(this.Dn(e,t,r,a))}),(a=>{o.push(this.vn(e,t,r,a))})),N.waitFor(o)}yn(e){let t=1;return As(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,i,s)=>{s.done(),t=i.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,a)=>Br(o,a))).filter(((o,a,c)=>!a||Br(o,c[a-1])!==0));const i=[];i.push(e);for(const o of r){const a=Br(o,e),c=Br(o,t);if(a===0)i[0]=e.Zt();else if(a>0&&c<0)i.push(o),i.push(o.Zt());else if(c>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const a=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Yc,[]],c=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Yc,[]];s.push(IDBKeyRange.bound(a,c))}return s}Cn(e,t){return Br(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(V_)}getMinOffset(e,t){return N.mapArray(this.hn(t),(r=>this.Pn(e,r).next((i=>i||re())))).next(V_)}}function N_(n){return Et(n,"collectionParents")}function ws(n){return Et(n,"indexEntries")}function Qo(n){return Et(n,"indexConfiguration")}function As(n){return Et(n,"indexState")}function V_(n){se(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;Rf(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new gn(e.readTime,e.documentKey,t)}/**
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
 */const O_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Mt{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new Mt(e,Mt.DEFAULT_COLLECTION_PERCENTILE,Mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aT(n,e,t){const r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let a=0;const c=r.J({range:o},((h,f,m)=>(a++,m.delete())));s.push(c.next((()=>{se(a===1)})));const l=[];for(const h of t.mutations){const f=sE(e,h.key.path,t.batchId);s.push(i.delete(f)),l.push(h.key)}return N.waitFor(s).next((()=>l))}function Bu(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw re();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Mt.DEFAULT_COLLECTION_PERCENTILE=10,Mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Mt.DEFAULT=new Mt(41943040,Mt.DEFAULT_COLLECTION_PERCENTILE,Mt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Mt.DISABLED=new Mt(-1,0,0);class Pl{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Fn={}}static lt(e,t,r,i){se(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Pl(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return qr(e).J({index:"userMutationsIndex",range:r},((i,s,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,i){const s=Ns(e),o=qr(e);return o.add({}).next((a=>{se(typeof a=="number");const c=new Of(a,t,r,i),l=(function(g,b,R){const C=R.baseMutations.map((D=>Ha(g.ct,D))),V=R.mutations.map((D=>Ha(g.ct,D)));return{userId:b,batchId:R.batchId,localWriteTimeMs:R.localWriteTime.toMillis(),baseMutations:C,mutations:V}})(this.serializer,this.userId,c),h=[];let f=new Le(((m,g)=>me(m.canonicalString(),g.canonicalString())));for(const m of i){const g=sE(this.userId,m.key.path,a);f=f.add(m.key.path.popLast()),h.push(o.put(l)),h.push(s.put(g,_C))}return f.forEach((m=>{h.push(this.indexManager.addToCollectionParentIndex(e,m))})),e.addOnCommittedListener((()=>{this.Fn[a]=c.keys()})),N.waitFor(h).next((()=>c))}))}lookupMutationBatch(e,t){return qr(e).get(t).next((r=>r?(se(r.userId===this.userId),qi(this.serializer,r)):null))}Mn(e,t){return this.Fn[t]?N.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const i=r.keys();return this.Fn[t]=i,i}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return qr(e).J({index:"userMutationsIndex",range:i},((o,a,c)=>{a.userId===this.userId&&(se(a.batchId>=r),s=qi(this.serializer,a)),c.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return qr(e).J({index:"userMutationsIndex",range:t,reverse:!0},((i,s,o)=>{r=s.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return qr(e).U("userMutationsIndex",t).next((r=>r.map((i=>qi(this.serializer,i)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=hu(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return Ns(e).J({range:i},((o,a,c)=>{const[l,h,f]=o,m=qn(h);if(l===this.userId&&t.path.isEqual(m))return qr(e).get(f).next((g=>{if(!g)throw re();se(g.userId===this.userId),s.push(qi(this.serializer,g))}));c.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Le(me);const i=[];return t.forEach((s=>{const o=hu(this.userId,s.path),a=IDBKeyRange.lowerBound(o),c=Ns(e).J({range:a},((l,h,f)=>{const[m,g,b]=l,R=qn(g);m===this.userId&&s.path.isEqual(R)?r=r.add(b):f.done()}));i.push(c)})),N.waitFor(i).next((()=>this.xn(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=hu(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new Le(me);return Ns(e).J({range:o},((c,l,h)=>{const[f,m,g]=c,b=qn(m);f===this.userId&&r.isPrefixOf(b)?b.length===i&&(a=a.add(g)):h.done()})).next((()=>this.xn(e,a)))}xn(e,t){const r=[],i=[];return t.forEach((s=>{i.push(qr(e).get(s).next((o=>{if(o===null)throw re();se(o.userId===this.userId),r.push(qi(this.serializer,o))})))})),N.waitFor(i).next((()=>r))}removeMutationBatch(e,t){return aT(e._e,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.On(t.batchId)})),N.forEach(r,(i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return N.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),i=[];return Ns(e).J({range:r},((s,o,a)=>{if(s[0]===this.userId){const c=qn(s[1]);i.push(c)}else a.done()})).next((()=>{se(i.length===0)}))}))}containsKey(e,t){return cT(e,this.userId,t)}Nn(e){return uT(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""}))}}function cT(n,e,t){const r=hu(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return Ns(n).J({range:s,H:!0},((a,c,l)=>{const[h,f,m]=a;h===e&&f===i&&(o=!0),l.done()})).next((()=>o))}function qr(n){return Et(n,"mutations")}function Ns(n){return Et(n,"documentMutations")}function uT(n){return Et(n,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class kD{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next((t=>{const r=new os(t.highestTargetId);return t.highestTargetId=r.next(),this.Qn(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.qn(e).next((t=>ae.fromTimestamp(new Je(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.qn(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.qn(e).next((i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i))))}addTargetData(e,t){return this.Kn(e,t).next((()=>this.qn(e).next((r=>(r.targetCount+=1,this.$n(t,r),this.Qn(e,r))))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>bs(e).delete(t.targetId))).next((()=>this.qn(e))).next((r=>(se(r.targetCount>0),r.targetCount-=1,this.Qn(e,r))))}removeTargets(e,t,r){let i=0;const s=[];return bs(e).J(((o,a)=>{const c=ua(a);c.sequenceNumber<=t&&r.get(c.targetId)===null&&(i++,s.push(this.removeTargetData(e,c)))})).next((()=>N.waitFor(s))).next((()=>i))}forEachTarget(e,t){return bs(e).J(((r,i)=>{const s=ua(i);t(s)}))}qn(e){return x_(e).get("targetGlobalKey").next((t=>(se(t!==null),t)))}Qn(e,t){return x_(e).put("targetGlobalKey",t)}Kn(e,t){return bs(e).put(iT(this.serializer,t))}$n(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.qn(e).next((t=>t.targetCount))}getTargetData(e,t){const r=ts(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return bs(e).J({range:i,index:"queryTargetsIndex"},((o,a,c)=>{const l=ua(a);uc(t,l.target)&&(s=l,c.done())})).next((()=>s))}addMatchingKeys(e,t,r){const i=[],s=Qr(e);return t.forEach((o=>{const a=jt(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))})),N.waitFor(i)}removeMatchingKeys(e,t,r){const i=Qr(e);return N.forEach(t,(s=>{const o=jt(s.path);return N.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])}))}removeMatchingKeysForTargetId(e,t){const r=Qr(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=Qr(e);let s=Ie();return i.J({range:r,H:!0},((o,a,c)=>{const l=qn(o[1]),h=new Z(l);s=s.add(h)})).next((()=>s))}containsKey(e,t){const r=jt(t.path),i=IDBKeyRange.bound([r],[Xv(r)],!1,!0);let s=0;return Qr(e).J({index:"documentTargetsIndex",H:!0,range:i},(([o,a],c,l)=>{o!==0&&(s++,l.done())})).next((()=>s>0))}ot(e,t){return bs(e).get(t).next((r=>r?ua(r):null))}}function bs(n){return Et(n,"targets")}function x_(n){return Et(n,"targetGlobal")}function Qr(n){return Et(n,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L_([n,e],[t,r]){const i=me(n,t);return i===0?me(e,r):i}class ND{constructor(e){this.Un=e,this.buffer=new Le(L_),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();L_(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class lT{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){$("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ii(t)?$("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await yi(t)}await this.Hn(3e5)}))}}class VD{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return N.resolve(Zt.oe);const r=new ND(t);return this.Jn.forEachTarget(e,(i=>r.zn(i.sequenceNumber))).next((()=>this.Jn.Zn(e,(i=>r.zn(i))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.Jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?($("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(O_)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?($("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),O_):this.Xn(e,t)))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let r,i,s,o,a,c,l;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((f=>(f>this.params.maximumSequenceNumbersToCollect?($("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),i=this.params.maximumSequenceNumbersToCollect):i=f,o=Date.now(),this.nthSequenceNumber(e,i)))).next((f=>(r=f,a=Date.now(),this.removeTargets(e,r,t)))).next((f=>(s=f,c=Date.now(),this.removeOrphanedDocuments(e,r)))).next((f=>(l=Date.now(),Cs()<=we.DEBUG&&$("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(c-a)+`ms
	Removed ${f} documents in `+(l-c)+`ms
Total Duration: ${l-h}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:f}))))}}function hT(n,e){return new VD(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OD{constructor(e,t){this.db=e,this.garbageCollector=hT(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}er(e){let t=0;return this.Zn(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,((r,i)=>t(i)))}addReference(e,t,r){return Xc(e,r)}removeReference(e,t,r){return Xc(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Xc(e,t)}nr(e,t){return(function(i,s){let o=!1;return uT(i).Y((a=>cT(i,a,s).next((c=>(c&&(o=!0),N.resolve(!c)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,((o,a)=>{if(a<=t){const c=this.nr(e,o).next((l=>{if(!l)return s++,r.getEntry(e,o).next((()=>(r.removeEntry(o,ae.min()),Qr(e).delete((function(f){return[0,jt(f.path)]})(o)))))}));i.push(c)}})).next((()=>N.waitFor(i))).next((()=>r.apply(e))).next((()=>s))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Xc(e,t)}tr(e,t){const r=Qr(e);let i,s=Zt.oe;return r.J({index:"documentTargetsIndex"},(([o,a],{path:c,sequenceNumber:l})=>{o===0?(s!==Zt.oe&&t(new Z(qn(i)),s),s=l,i=c):s=Zt.oe})).next((()=>{s!==Zt.oe&&t(new Z(qn(i)),s)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Xc(n,e){return Qr(n).put((function(r,i){return{targetId:0,path:jt(r.path),sequenceNumber:i}})(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(){this.changes=new Cr((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ge.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?N.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xD{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Oi(e).put(r)}removeEntry(e,t,r){return Oi(e).delete((function(s,o){const a=s.path.toArray();return[a.slice(0,a.length-2),a[a.length-2],Fu(o),a[a.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.rr(e,r))))}getEntry(e,t){let r=Ge.newInvalidDocument(t);return Oi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Jo(t))},((i,s)=>{r=this.ir(t,s)})).next((()=>r))}sr(e,t){let r={size:0,document:Ge.newInvalidDocument(t)};return Oi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Jo(t))},((i,s)=>{r={document:this.ir(t,s),size:Bu(s)}})).next((()=>r))}getEntries(e,t){let r=tn();return this._r(e,t,((i,s)=>{const o=this.ir(i,s);r=r.insert(i,o)})).next((()=>r))}ar(e,t){let r=tn(),i=new qe(Z.comparator);return this._r(e,t,((s,o)=>{const a=this.ir(s,o);r=r.insert(s,a),i=i.insert(s,Bu(o))})).next((()=>({documents:r,ur:i})))}_r(e,t,r){if(t.isEmpty())return N.resolve();let i=new Le(U_);t.forEach((c=>i=i.add(c)));const s=IDBKeyRange.bound(Jo(i.first()),Jo(i.last())),o=i.getIterator();let a=o.getNext();return Oi(e).J({index:"documentKeyIndex",range:s},((c,l,h)=>{const f=Z.fromSegments([...l.prefixPath,l.collectionGroup,l.documentId]);for(;a&&U_(a,f)<0;)r(a,null),a=o.getNext();a&&a.isEqual(f)&&(r(a,l),a=o.hasNext()?o.getNext():null),a?h.$(Jo(a)):h.done()})).next((()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,a=[o.popLast().toArray(),o.lastSegment(),Fu(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Oi(e).U(IDBKeyRange.bound(a,c,!0)).next((l=>{s==null||s.incrementDocumentReadCount(l.length);let h=tn();for(const f of l){const m=this.ir(Z.fromSegments(f.prefixPath.concat(f.collectionGroup,f.documentId)),f);m.isFoundDocument()&&(hc(t,m)||i.has(m.key))&&(h=h.insert(m.key,m))}return h}))}getAllFromCollectionGroup(e,t,r,i){let s=tn();const o=F_(t,r),a=F_(t,gn.max());return Oi(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},((c,l,h)=>{const f=this.ir(Z.fromSegments(l.prefixPath.concat(l.collectionGroup,l.documentId)),l);s=s.insert(f.key,f),s.size===i&&h.done()})).next((()=>s))}newChangeBuffer(e){return new LD(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return M_(e).get("remoteDocumentGlobalKey").next((t=>(se(!!t),t)))}rr(e,t){return M_(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const r=ED(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(ae.min())))return r}return Ge.newInvalidDocument(e)}}function fT(n){return new xD(n)}class LD extends dT{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new Cr((r=>r.toString()),((r,i)=>r.isEqual(i)))}applyChanges(e){const t=[];let r=0,i=new Le(((s,o)=>me(s.canonicalString(),o.canonicalString())));return this.changes.forEach(((s,o)=>{const a=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,a.readTime)),o.isValidDocument()){const c=w_(this.cr.serializer,o);i=i.add(s.path.popLast());const l=Bu(c);r+=l-a.size,t.push(this.cr.addEntry(e,s,c))}else if(r-=a.size,this.trackRemovals){const c=w_(this.cr.serializer,o.convertToNoDocument(ae.min()));t.push(this.cr.addEntry(e,s,c))}})),i.forEach((s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))})),t.push(this.cr.updateMetadata(e,r)),N.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next((r=>(this.lr.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.cr.ar(e,t).next((({documents:r,ur:i})=>(i.forEach(((s,o)=>{this.lr.set(s,{size:o,readTime:r.get(s).readTime})})),r)))}}function M_(n){return Et(n,"remoteDocumentGlobal")}function Oi(n){return Et(n,"remoteDocumentsV14")}function Jo(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function F_(n,e){const t=e.documentKey.path.toArray();return[n,Fu(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function U_(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=me(t[s],r[s]),i)return i;return i=me(t.length,r.length),i||(i=me(t[t.length-2],r[r.length-2]),i||me(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class MD{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(r=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(r!==null&&Ta(r.mutation,i,en.empty(),Je.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,Ie()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=Ie()){const i=jn();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,r).next((s=>{let o=aa();return s.forEach(((a,c)=>{o=o.insert(a,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=jn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,Ie())))}populateOverlays(e,t,r){const i=[];return r.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((o,a)=>{t.set(o,a)}))}))}computeViews(e,t,r,i){let s=tn();const o=Ea(),a=(function(){return Ea()})();return t.forEach(((c,l)=>{const h=r.get(l.key);i.has(l.key)&&(h===void 0||h.mutation instanceof Dr)?s=s.insert(l.key,l):h!==void 0?(o.set(l.key,h.mutation.getFieldMask()),Ta(h.mutation,l,h.mutation.getFieldMask(),Je.now())):o.set(l.key,en.empty())})),this.recalculateAndSaveOverlays(e,s).next((c=>(c.forEach(((l,h)=>o.set(l,h))),t.forEach(((l,h)=>{var f;return a.set(l,new MD(h,(f=o.get(l))!==null&&f!==void 0?f:null))})),a)))}recalculateAndSaveOverlays(e,t){const r=Ea();let i=new qe(((o,a)=>o-a)),s=Ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const a of o)a.keys().forEach((c=>{const l=t.get(c);if(l===null)return;let h=r.get(c)||en.empty();h=a.applyToLocalView(l,h),r.set(c,h);const f=(i.get(a.batchId)||Ie()).add(c);i=i.insert(a.batchId,f)}))})).next((()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),l=c.key,h=c.value,f=DE();h.forEach((m=>{if(!s.has(m)){const g=ME(t.get(m),r.get(m));g!==null&&f.set(m,g),s=s.add(m)}})),o.push(this.documentOverlayCache.saveOverlays(e,l,f))}return N.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,i){return(function(o){return Z.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Df(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next((s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):N.resolve(jn());let a=-1,c=s;return o.next((l=>N.forEach(l,((h,f)=>(a<f.largestBatchId&&(a=f.largestBatchId),s.get(h)?N.resolve():this.remoteDocumentCache.getEntry(e,h).next((m=>{c=c.insert(h,m)}))))).next((()=>this.populateOverlays(e,l,s))).next((()=>this.computeViews(e,c,l,Ie()))).next((h=>({batchId:a,changes:CE(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Z(t)).next((r=>{let i=aa();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=aa();return this.indexManager.getCollectionParents(e,s).next((a=>N.forEach(a,(c=>{const l=(function(f,m){return new Pr(m,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)})(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r,i).next((h=>{h.forEach(((f,m)=>{o=o.insert(f,m)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i)))).next((o=>{s.forEach(((c,l)=>{const h=l.getKey();o.get(h)===null&&(o=o.insert(h,Ge.newInvalidDocument(h)))}));let a=aa();return o.forEach(((c,l)=>{const h=s.get(c);h!==void 0&&Ta(h.mutation,l,en.empty(),Je.now()),hc(t,l)&&(a=a.insert(c,l))})),a}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FD{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return N.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:dt(i.createTime)}})(t)),N.resolve()}getNamedQuery(e,t){return N.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(i){return{name:i.name,query:Uf(i.bundledQuery),readTime:dt(i.readTime)}})(t)),N.resolve()}}/**
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
 */class UD{constructor(){this.overlays=new qe(Z.comparator),this.Ir=new Map}getOverlay(e,t){return N.resolve(this.overlays.get(t))}getOverlays(e,t){const r=jn();return N.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&r.set(i,s)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((i,s)=>{this.ht(e,t,s)})),N.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Ir.delete(r)),N.resolve()}getOverlaysForCollection(e,t,r){const i=jn(),s=t.length+1,o=new Z(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,l=c.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return N.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new qe(((l,h)=>l-h));const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let h=s.get(l.largestBatchId);h===null&&(h=jn(),s=s.insert(l.largestBatchId,h)),h.set(l.getKey(),l)}}const a=jn(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((l,h)=>a.set(l,h))),!(a.size()>=i)););return N.resolve(a)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Lf(t,r));let s=this.Ir.get(t);s===void 0&&(s=Ie(),this.Ir.set(t,s)),this.Ir.set(t,s.add(r.key))}}/**
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
 */class BD{constructor(){this.sessionToken=tt.EMPTY_BYTE_STRING}getSessionToken(e){return N.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,N.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(){this.Tr=new Le(Tt.Er),this.dr=new Le(Tt.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new Tt(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Vr(new Tt(e,t))}mr(e,t){e.forEach((r=>this.removeReference(r,t)))}gr(e){const t=new Z(new Ae([])),r=new Tt(t,e),i=new Tt(t,e+1),s=[];return this.dr.forEachInRange([r,i],(o=>{this.Vr(o),s.push(o.key)})),s}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new Z(new Ae([])),r=new Tt(t,e),i=new Tt(t,e+1);let s=Ie();return this.dr.forEachInRange([r,i],(o=>{s=s.add(o.key)})),s}containsKey(e){const t=new Tt(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class Tt{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return Z.comparator(e.key,t.key)||me(e.wr,t.wr)}static Ar(e,t){return me(e.wr,t.wr)||Z.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qD{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Le(Tt.Er)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Of(s,t,r,i);this.mutationQueue.push(o);for(const a of i)this.br=this.br.add(new Tt(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return N.resolve(o)}lookupMutationBatch(e,t){return N.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),s=i<0?0:i;return N.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new Tt(t,0),i=new Tt(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],(o=>{const a=this.Dr(o.wr);s.push(a)})),N.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Le(me);return t.forEach((i=>{const s=new Tt(i,0),o=new Tt(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],(a=>{r=r.add(a.wr)}))})),N.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;Z.isDocumentKey(s)||(s=s.child(""));const o=new Tt(new Z(s),0);let a=new Le(me);return this.br.forEachWhile((c=>{const l=c.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(a=a.add(c.wr)),!0)}),o),N.resolve(this.Cr(a))}Cr(e){const t=[];return e.forEach((r=>{const i=this.Dr(r);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){se(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return N.forEach(t.mutations,(i=>{const s=new Tt(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.br=r}))}On(e){}containsKey(e,t){const r=new Tt(t,0),i=this.br.firstAfterOrEqual(r);return N.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jD{constructor(e){this.Mr=e,this.docs=(function(){return new qe(Z.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return N.resolve(r?r.document.mutableCopy():Ge.newInvalidDocument(t))}getEntries(e,t){let r=tn();return t.forEach((i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ge.newInvalidDocument(i))})),N.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=tn();const o=t.path,a=new Z(o.child("")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:l,value:{document:h}}=c.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||Rf(eE(h),r)<=0||(i.has(h.key)||hc(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return N.resolve(s)}getAllFromCollectionGroup(e,t,r,i){re()}Or(e,t){return N.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new GD(this)}getSize(e){return N.resolve(this.size)}}class GD extends dT{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)})),N.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KD{constructor(e){this.persistence=e,this.Nr=new Cr((t=>ts(t)),uc),this.lastRemoteSnapshotVersion=ae.min(),this.highestTargetId=0,this.Lr=0,this.Br=new jf,this.targetCount=0,this.kr=os.Bn()}forEachTarget(e,t){return this.Nr.forEach(((r,i)=>t(i))),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),N.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new os(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,N.resolve()}updateTargetData(e,t){return this.Kn(t),N.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Nr.forEach(((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)})),N.waitFor(s).next((()=>i))}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return N.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),N.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((o=>{s.push(i.markPotentiallyOrphaned(e,o))})),N.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),N.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return N.resolve(r)}containsKey(e,t){return N.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Zt(0),this.Kr=!1,this.Kr=!0,this.$r=new BD,this.referenceDelegate=e(this),this.Ur=new KD(this),this.indexManager=new CD,this.remoteDocumentCache=(function(i){return new jD(i)})((r=>this.referenceDelegate.Wr(r))),this.serializer=new rT(t),this.Gr=new FD(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new UD,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new qD(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){$("MemoryPersistence","Starting transaction:",e);const i=new $D(this.Qr.next());return this.referenceDelegate.zr(),r(i).next((s=>this.referenceDelegate.jr(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Hr(e,t){return N.or(Object.values(this.qr).map((r=>()=>r.containsKey(e,t))))}}class $D extends nE{constructor(e){super(),this.currentSequenceNumber=e}}class Cl{constructor(e){this.persistence=e,this.Jr=new jf,this.Yr=null}static Zr(e){return new Cl(e)}get Xr(){if(this.Yr)return this.Yr;throw re()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),N.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),N.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),N.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((i=>this.Xr.add(i.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.Xr.add(s.toString())))})).next((()=>r.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.Xr,(r=>{const i=Z.fromPath(r);return this.ei(e,i).next((s=>{s||t.removeEntry(i,ae.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return N.or([()=>N.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class qu{constructor(e,t){this.persistence=e,this.ti=new Cr((r=>jt(r.path)),((r,i)=>r.isEqual(i))),this.garbageCollector=hT(this,t)}static Zr(e,t){return new qu(e,t)}zr(){}jr(e){return N.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((i=>r+i))))}er(e){let t=0;return this.Zn(e,(r=>{t++})).next((()=>t))}Zn(e,t){return N.forEach(this.ti,((r,i)=>this.nr(e,r,i).next((s=>s?N.resolve():t(i)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Or(e,(o=>this.nr(e,o,t).next((a=>{a||(r++,s.removeEntry(o,ae.min()))})))).next((()=>s.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),N.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),N.resolve()}removeReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),N.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),N.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=fu(e.data.value)),t}nr(e,t,r){return N.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.ti.get(t);return N.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zD{constructor(e){this.serializer=e}O(e,t,r,i){const s=new vl("createOrUpgrade",t);r<1&&i>=1&&((function(c){c.createObjectStore("owner")})(e),(function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Zg,{unique:!0}),c.createObjectStore("documentMutations")})(e),B_(e),(function(c){c.createObjectStore("remoteDocuments")})(e));let o=N.resolve();return r<3&&i>=3&&(r!==0&&((function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")})(e),B_(e)),o=o.next((()=>(function(c){const l=c.store("targetGlobal"),h={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:ae.min().toTimestamp(),targetCount:0};return l.put("targetGlobalKey",h)})(s)))),r<4&&i>=4&&(r!==0&&(o=o.next((()=>(function(c,l){return l.store("mutations").U().next((h=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Zg,{unique:!0});const f=l.store("mutations"),m=h.map((g=>f.put(g)));return N.waitFor(m)}))})(e,s)))),o=o.next((()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)}))),r<5&&i>=5&&(o=o.next((()=>this.ni(s)))),r<6&&i>=6&&(o=o.next((()=>((function(c){c.createObjectStore("remoteDocumentGlobal")})(e),this.ri(s))))),r<7&&i>=7&&(o=o.next((()=>this.ii(s)))),r<8&&i>=8&&(o=o.next((()=>this.si(e,s)))),r<9&&i>=9&&(o=o.next((()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&i>=10&&(o=o.next((()=>this.oi(s)))),r<11&&i>=11&&(o=o.next((()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),(function(c){c.createObjectStore("namedQueries",{keyPath:"name"})})(e)}))),r<12&&i>=12&&(o=o.next((()=>{(function(c){const l=c.createObjectStore("documentOverlays",{keyPath:CC});l.createIndex("collectionPathOverlayIndex",DC,{unique:!1}),l.createIndex("collectionGroupOverlayIndex",kC,{unique:!1})})(e)}))),r<13&&i>=13&&(o=o.next((()=>(function(c){const l=c.createObjectStore("remoteDocumentsV14",{keyPath:yC});l.createIndex("documentKeyIndex",IC),l.createIndex("collectionGroupIndex",vC)})(e))).next((()=>this._i(e,s))).next((()=>e.deleteObjectStore("remoteDocuments")))),r<14&&i>=14&&(o=o.next((()=>this.ai(e,s)))),r<15&&i>=15&&(o=o.next((()=>(function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:bC}).createIndex("sequenceNumberIndex",RC,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:SC}).createIndex("documentKeyIndex",PC,{unique:!1})})(e)))),r<16&&i>=16&&(o=o.next((()=>{t.objectStore("indexState").clear()})).next((()=>{t.objectStore("indexEntries").clear()}))),r<17&&i>=17&&(o=o.next((()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)}))),o}ri(e){let t=0;return e.store("remoteDocuments").J(((r,i)=>{t+=Bu(i)})).next((()=>{const r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)}))}ni(e){const t=e.store("mutationQueues"),r=e.store("mutations");return t.U().next((i=>N.forEach(i,(s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next((a=>N.forEach(a,(c=>{se(c.userId===s.userId);const l=qi(this.serializer,c);return aT(e,s.userId,l).next((()=>{}))}))))}))))}ii(e){const t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next((i=>{const s=[];return r.J(((o,a)=>{const c=new Ae(o),l=(function(f){return[0,jt(f)]})(c);s.push(t.get(l).next((h=>h?N.resolve():(f=>t.put({targetId:0,path:jt(f),sequenceNumber:i.highestListenSequenceNumber}))(c))))})).next((()=>N.waitFor(s)))}))}si(e,t){e.createObjectStore("collectionParents",{keyPath:AC});const r=t.store("collectionParents"),i=new qf,s=o=>{if(i.add(o)){const a=o.lastSegment(),c=o.popLast();return r.put({collectionId:a,parent:jt(c)})}};return t.store("remoteDocuments").J({H:!0},((o,a)=>{const c=new Ae(o);return s(c.popLast())})).next((()=>t.store("documentMutations").J({H:!0},(([o,a,c],l)=>{const h=qn(a);return s(h.popLast())}))))}oi(e){const t=e.store("targets");return t.J(((r,i)=>{const s=ua(i),o=iT(this.serializer,s);return t.put(o)}))}_i(e,t){const r=t.store("remoteDocuments"),i=[];return r.J(((s,o)=>{const a=t.store("remoteDocumentsV14"),c=(function(f){return f.document?new Z(Ae.fromString(f.document.name).popFirst(5)):f.noDocument?Z.fromSegments(f.noDocument.path):f.unknownDocument?Z.fromSegments(f.unknownDocument.path):re()})(o).path.toArray(),l={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(l))})).next((()=>N.waitFor(i)))}ai(e,t){const r=t.store("mutations"),i=fT(this.serializer),s=new Gf(Cl.Zr,this.serializer.ct);return r.U().next((o=>{const a=new Map;return o.forEach((c=>{var l;let h=(l=a.get(c.userId))!==null&&l!==void 0?l:Ie();qi(this.serializer,c).keys().forEach((f=>h=h.add(f))),a.set(c.userId,h)})),N.forEach(a,((c,l)=>{const h=new wt(l),f=Sl.lt(this.serializer,h),m=s.getIndexManager(h),g=Pl.lt(h,this.serializer,m,s.referenceDelegate);return new pT(i,g,f,m).recalculateAndSaveOverlaysForDocumentKeys(new bd(t,Zt.oe),c).next()}))}))}}function B_(n){n.createObjectStore("targetDocuments",{keyPath:TC}).createIndex("documentTargetsIndex",wC,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",EC,{unique:!0}),n.createObjectStore("targetGlobal")}const Mh="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Kf{constructor(e,t,r,i,s,o,a,c,l,h,f=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.ui=s,this.window=o,this.document=a,this.ci=l,this.li=h,this.hi=f,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=m=>Promise.resolve(),!Kf.D())throw new K(L.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new OD(this,i),this.Ai=t+"main",this.serializer=new rT(c),this.Ri=new Hn(this.Ai,this.hi,new zD(this.serializer)),this.$r=new wD,this.Ur=new kD(this.referenceDelegate,this.serializer),this.remoteDocumentCache=fT(this.serializer),this.Gr=new TD,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,h===!1&&lt("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new K(L.FAILED_PRECONDITION,Mh);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Ur.getHighestSequenceNumber(e)))})).then((e=>{this.Qr=new Zt(e,this.ci)})).then((()=>{this.Kr=!0})).catch((e=>(this.Ri&&this.Ri.close(),Promise.reject(e))))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget((async()=>{this.started&&await this.mi()})))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>Zc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.wi(e).next((t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))))}))})).next((()=>this.Si(e))).next((t=>this.isPrimary&&!t?this.bi(e).next((()=>!1)):!!t&&this.Di(e).next((()=>!0)))))).catch((e=>{if(Ii(e))return $("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return $("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.ui.enqueueRetryable((()=>this.di(e))),this.isPrimary=e}))}wi(e){return Yo(e).get("owner").next((t=>N.resolve(this.vi(t))))}Ci(e){return Zc(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=Et(t,"clientMetadata");return r.U().next((i=>{const s=this.xi(i,18e5),o=i.filter((a=>s.indexOf(a)===-1));return N.forEach(o,(a=>r.delete(a.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.mi().then((()=>this.Fi())).then((()=>this.pi()))))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?N.resolve(!0):Yo(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new K(L.FAILED_PRECONDITION,Mh);return!1}}return!(!this.networkEnabled||!this.inForeground)||Zc(e).U().next((r=>this.xi(r,5e3).find((i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&$("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],(e=>{const t=new bd(e,Zt.oe);return this.bi(t).next((()=>this.Ci(t)))})),this.Ri.close(),this.qi()}xi(e,t){return e.filter((r=>this.Mi(r.updateTimeMs,t)&&!this.Ni(r.clientId)))}Qi(){return this.runTransaction("getActiveClients","readonly",(e=>Zc(e).U().next((t=>this.xi(t,18e5).map((r=>r.clientId))))))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Pl.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new DD(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Sl.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,r){$("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=(function(c){return c===17?OC:c===16?VC:c===15?Pf:c===14?cE:c===13?aE:c===12?NC:c===11?oE:void re()})(this.hi);let o;return this.Ri.runTransaction(e,i,s,(a=>(o=new bd(a,this.Qr?this.Qr.next():Zt.oe),t==="readwrite-primary"?this.wi(o).next((c=>!!c||this.Si(o))).next((c=>{if(!c)throw lt(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))),new K(L.FAILED_PRECONDITION,tE);return r(o)})).next((c=>this.Di(o).next((()=>c)))):this.Ki(o).next((()=>r(o)))))).then((a=>(o.raiseOnCommittedEvent(),a)))}Ki(e){return Yo(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new K(L.FAILED_PRECONDITION,Mh)}))}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Yo(e).put("owner",t)}static D(){return Hn.D()}bi(e){const t=Yo(e);return t.get("owner").next((r=>this.vi(r)?($("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):N.resolve()))}Mi(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(lt(`Detected an update time that is in the future: ${e} > ${r}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.mi())))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;Mv()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const r=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return $("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return lt("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){lt("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Yo(n){return Et(n,"owner")}function Zc(n){return Et(n,"clientMetadata")}function $f(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=Ie(),i=Ie();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new zf(e,t.fromCache,r,i)}}/**
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
 */class HD{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class mT{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return Mv()?8:rE(vt())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.Yi(e,t).next((o=>{s.result=o})).next((()=>{if(!s.result)return this.Zi(e,t,i,r).next((o=>{s.result=o}))})).next((()=>{if(s.result)return;const o=new HD;return this.Xi(e,t,o).next((a=>{if(s.result=a,this.zi)return this.es(e,t,o,a.size)}))})).next((()=>s.result))}es(e,t,r,i){return r.documentReadCount<this.ji?(Cs()<=we.DEBUG&&$("QueryEngine","SDK will not create cache indexes for query:",Ds(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),N.resolve()):(Cs()<=we.DEBUG&&$("QueryEngine","Query:",Ds(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(Cs()<=we.DEBUG&&$("QueryEngine","The SDK decides to create cache indexes for query:",Ds(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Gt(t))):N.resolve())}Yi(e,t){if(d_(t))return N.resolve(null);let r=Gt(t);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=Lu(t,null,"F"),r=Gt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((s=>{const o=Ie(...s);return this.Ji.getDocuments(e,o).next((a=>this.indexManager.getMinOffset(e,r).next((c=>{const l=this.ts(t,a);return this.ns(t,l,o,c.readTime)?this.Yi(e,Lu(t,null,"F")):this.rs(e,l,t,c)}))))})))))}Zi(e,t,r,i){return d_(t)||i.isEqual(ae.min())?N.resolve(null):this.Ji.getDocuments(e,r).next((s=>{const o=this.ts(t,s);return this.ns(t,o,r,i)?N.resolve(null):(Cs()<=we.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ds(t)),this.rs(e,o,t,Zv(i,-1)).next((a=>a)))}))}ts(e,t){let r=new Le(SE(e));return t.forEach(((i,s)=>{hc(e,s)&&(r=r.add(s))})),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,r){return Cs()<=we.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",Ds(t)),this.Ji.getDocumentsMatchingQuery(e,t,gn.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next((s=>(t.forEach((o=>{s=s.insert(o.key,o)})),s)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WD{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new qe(me),this._s=new Cr((s=>ts(s)),uc),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new pT(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function gT(n,e,t,r){return new WD(n,e,t,r)}async function _T(n,e){const t=J(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next((s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(r)))).next((s=>{const o=[],a=[];let c=Ie();for(const l of i){o.push(l.batchId);for(const h of l.mutations)c=c.add(h.key)}for(const l of s){a.push(l.batchId);for(const h of l.mutations)c=c.add(h.key)}return t.localDocuments.getDocuments(r,c).next((l=>({hs:l,removedBatchIds:o,addedBatchIds:a})))}))}))}function QD(n,e){const t=J(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return(function(a,c,l,h){const f=l.batch,m=f.keys();let g=N.resolve();return m.forEach((b=>{g=g.next((()=>h.getEntry(c,b))).next((R=>{const C=l.docVersions.get(b);se(C!==null),R.version.compareTo(C)<0&&(f.applyToRemoteDocument(R,l),R.isValidDocument()&&(R.setReadTime(l.commitVersion),h.addEntry(R)))}))})),g.next((()=>a.mutationQueue.removeMutationBatch(c,f)))})(t,r,e,s).next((()=>s.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(a){let c=Ie();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(c=c.add(a.batch.mutations[l].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(r,i)))}))}function yT(n){const e=J(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ur.getLastRemoteSnapshotVersion(t)))}function JD(n,e){const t=J(n),r=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const a=[];e.targetChanges.forEach(((h,f)=>{const m=i.get(f);if(!m)return;a.push(t.Ur.removeMatchingKeys(s,h.removedDocuments,f).next((()=>t.Ur.addMatchingKeys(s,h.addedDocuments,f))));let g=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(f)!==null?g=g.withResumeToken(tt.EMPTY_BYTE_STRING,ae.min()).withLastLimboFreeSnapshotVersion(ae.min()):h.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(h.resumeToken,r)),i=i.insert(f,g),(function(R,C,V){return R.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=3e8?!0:V.addedDocuments.size+V.modifiedDocuments.size+V.removedDocuments.size>0})(m,g,h)&&a.push(t.Ur.updateTargetData(s,g))}));let c=tn(),l=Ie();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))})),a.push(IT(s,o,e.documentUpdates).next((h=>{c=h.Ps,l=h.Is}))),!r.isEqual(ae.min())){const h=t.Ur.getLastRemoteSnapshotVersion(s).next((f=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r)));a.push(h)}return N.waitFor(a).next((()=>o.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,c,l))).next((()=>c))})).then((s=>(t.os=i,s)))}function IT(n,e,t){let r=Ie(),i=Ie();return t.forEach((s=>r=r.add(s))),e.getEntries(n,r).next((s=>{let o=tn();return t.forEach(((a,c)=>{const l=s.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(a)),c.isNoDocument()&&c.version.isEqual(ae.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):$("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)})),{Ps:o,Is:i}}))}function YD(n,e){const t=J(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function eo(n,e){const t=J(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let i;return t.Ur.getTargetData(r,e).next((s=>s?(i=s,N.resolve(i)):t.Ur.allocateTargetId(r).next((o=>(i=new dr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,i).next((()=>i)))))))})).then((r=>{const i=t.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r}))}async function to(n,e,t){const r=J(n),i=r.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,(o=>r.persistence.referenceDelegate.removeTarget(o,i)))}catch(o){if(!Ii(o))throw o;$("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function ju(n,e,t){const r=J(n);let i=ae.min(),s=Ie();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,l,h){const f=J(c),m=f._s.get(h);return m!==void 0?N.resolve(f.os.get(m)):f.Ur.getTargetData(l,h)})(r,o,Gt(e)).next((a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,a.targetId).next((c=>{s=c}))})).next((()=>r.ss.getDocumentsMatchingQuery(o,e,t?i:ae.min(),t?s:Ie()))).next((a=>(TT(r,RE(e),a),{documents:a,Ts:s})))))}function vT(n,e){const t=J(n),r=J(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",(s=>r.ot(s,e).next((o=>o?o.target:null))))}function ET(n,e){const t=J(n),r=t.us.get(e)||ae.min();return t.persistence.runTransaction("Get new document changes","readonly",(i=>t.cs.getAllFromCollectionGroup(i,e,Zv(r,-1),Number.MAX_SAFE_INTEGER))).then((i=>(TT(t,e,i),i)))}function TT(n,e,t){let r=n.us.get(e)||ae.min();t.forEach(((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)})),n.us.set(e,r)}async function XD(n,e,t,r){const i=J(n);let s=Ie(),o=tn();for(const l of t){const h=e.Es(l.metadata.name);l.document&&(s=s.add(h));const f=e.ds(l);f.setReadTime(e.As(l.metadata.readTime)),o=o.insert(h,f)}const a=i.cs.newChangeBuffer({trackRemovals:!0}),c=await eo(i,(function(h){return Gt(mo(Ae.fromString(`__bundle__/docs/${h}`)))})(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",(l=>IT(l,a,o).next((h=>(a.apply(l),h))).next((h=>i.Ur.removeMatchingKeysForTargetId(l,c.targetId).next((()=>i.Ur.addMatchingKeys(l,s,c.targetId))).next((()=>i.localDocuments.getLocalViewOfDocuments(l,h.Ps,h.Is))).next((()=>h.Ps))))))}async function ZD(n,e,t=Ie()){const r=await eo(n,Gt(Uf(e.bundledQuery))),i=J(n);return i.persistence.runTransaction("Save named query","readwrite",(s=>{const o=dt(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Gr.saveNamedQuery(s,e);const a=r.withResumeToken(tt.EMPTY_BYTE_STRING,o);return i.os=i.os.insert(a.targetId,a),i.Ur.updateTargetData(s,a).next((()=>i.Ur.removeMatchingKeysForTargetId(s,r.targetId))).next((()=>i.Ur.addMatchingKeys(s,t,r.targetId))).next((()=>i.Gr.saveNamedQuery(s,e)))}))}function q_(n,e){return`firestore_clients_${n}_${e}`}function j_(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Fh(n,e){return`firestore_targets_${n}_${e}`}class Gu{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Rs(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new K(i.error.code,i.error.message))),o?new Gu(e,t,i.state,s):(lt("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class wa{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Rs(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new K(r.error.code,r.error.message))),s?new wa(e,r.state,i):(lt("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ku{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=kf();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=iE(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new Ku(e,s):(lt("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class Hf{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Hf(t.clientId,t.onlineState):(lt("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Ud{constructor(){this.activeTargetIds=kf()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Uh{constructor(e,t,r,i,s){this.window=e,this.ui=t,this.persistenceKey=r,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new qe(me),this.started=!1,this.bs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=q_(this.persistenceKey,this.ps),this.vs=(function(c){return`firestore_sequence_number_${c}`})(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Ud),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=(function(c){return`firestore_online_state_${c}`})(this.persistenceKey),this.Os=(function(c){return`firestore_bundle_loaded_v2_${c}`})(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const r of e){if(r===this.ps)continue;const i=this.getItem(q_(this.persistenceKey,r));if(i){const s=Ku.Rs(r,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const r=this.Ls(t);r&&this.Bs(r)}for(const r of this.bs)this.ws(r);this.bs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach(((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,r){this.qs(e,t,r),this.Qs(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Fh(this.persistenceKey,e));if(i){const s=wa.Rs(e,i);s&&(r=s.state)}}return t&&this.Ks.fs(e),this.Ns(),r}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Fh(this.persistenceKey,e))}updateQueryState(e,t,r){this.$s(e,t,r)}handleUserChange(e,t,r){t.forEach((i=>{this.Qs(i)})),this.currentUser=e,r.forEach((i=>{this.addPendingMutation(i)}))}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return $("SharedClientState","READ",e,t),t}setItem(e,t){$("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){$("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if($("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void lt("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const r=this.Gs(t.key);return this.zs(r,null)}{const r=this.js(t.key,t.newValue);if(r)return this.zs(r.clientId,r)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const r=this.Hs(t.key,t.newValue);if(r)return this.Js(r)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const r=this.Ys(t.key,t.newValue);if(r)return this.Zs(r)}}else if(t.key===this.xs){if(t.newValue!==null){const r=this.Ls(t.newValue);if(r)return this.Bs(r)}}else if(t.key===this.vs){const r=(function(s){let o=Zt.oe;if(s!=null)try{const a=JSON.parse(s);se(typeof a=="number"),o=a}catch(a){lt("SharedClientState","Failed to read sequence number from WebStorage",a)}return o})(t.newValue);r!==Zt.oe&&this.sequenceNumberHandler(r)}else if(t.key===this.Os){const r=this.Xs(t.newValue);await Promise.all(r.map((i=>this.syncEngine.eo(i))))}}}else this.bs.push(t)}))}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,r){const i=new Gu(this.currentUser,e,t,r),s=j_(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=j_(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,r){const i=Fh(this.persistenceKey,e),s=new wa(e,t,r);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const r=this.Gs(e);return Ku.Rs(r,t)}Hs(e,t){const r=this.Fs.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return Gu.Rs(new wt(s),i,t)}Ys(e,t){const r=this.Ms.exec(e),i=Number(r[1]);return wa.Rs(i,t)}Ls(e){return Hf.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);$("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const r=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(r),o=[],a=[];return s.forEach((c=>{i.has(c)||o.push(c)})),i.forEach((c=>{s.has(c)||a.push(c)})),this.syncEngine.io(o,a).then((()=>{this.Ss=r}))}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=kf();return e.forEach(((r,i)=>{t=t.unionWith(i.activeTargetIds)})),t}}class wT{constructor(){this.so=new Ud,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Ud,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class ek{_o(e){}shutdown(){}}/**
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
 */class G_{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){$("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){$("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let eu=null;function Bh(){return eu===null?eu=(function(){return 268435456+Math.round(2147483648*Math.random())})():eu++,"0x"+eu.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tk={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nk{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt="WebChannelConnection";class rk extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,r,i,s,o){const a=Bh(),c=this.xo(t,r.toUriEncodedString());$("RestConnection",`Sending RPC '${t}' ${a}:`,c,i);const l={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(l,s,o),this.No(t,c,l,i).then((h=>($("RestConnection",`Received RPC '${t}' ${a}: `,h),h)),(h=>{throw mn("RestConnection",`RPC '${t}' ${a} failed with error: `,h,"url: ",c,"request:",i),h}))}Lo(t,r,i,s,o,a){return this.Mo(t,r,i,s,o)}Oo(t,r,i){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+po})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((s,o)=>t[o]=s)),i&&i.headers.forEach(((s,o)=>t[o]=s))}xo(t,r){const i=tk[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const s=Bh();return new Promise(((o,a)=>{const c=new Kv;c.setWithCredentials(!0),c.listenOnce($v.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case lu.NO_ERROR:const h=c.getResponseJson();$(Lt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(h)),o(h);break;case lu.TIMEOUT:$(Lt,`RPC '${e}' ${s} timed out`),a(new K(L.DEADLINE_EXCEEDED,"Request time out"));break;case lu.HTTP_ERROR:const f=c.getStatus();if($(Lt,`RPC '${e}' ${s} failed with status:`,f,"response text:",c.getResponseText()),f>0){let m=c.getResponseJson();Array.isArray(m)&&(m=m[0]);const g=m==null?void 0:m.error;if(g&&g.status&&g.message){const b=(function(C){const V=C.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(V)>=0?V:L.UNKNOWN})(g.status);a(new K(b,g.message))}else a(new K(L.UNKNOWN,"Server responded with status "+c.getStatus()))}else a(new K(L.UNAVAILABLE,"Connection failed."));break;default:re()}}finally{$(Lt,`RPC '${e}' ${s} completed.`)}}));const l=JSON.stringify(i);$(Lt,`RPC '${e}' ${s} sending request:`,i),c.send(t,"POST",l,r,15)}))}Bo(e,t,r){const i=Bh(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Wv(),a=Hv(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const h=s.join("");$(Lt,`Creating RPC '${e}' stream ${i}: ${h}`,c);const f=o.createWebChannel(h,c);let m=!1,g=!1;const b=new nk({Io:C=>{g?$(Lt,`Not sending because RPC '${e}' stream ${i} is closed:`,C):(m||($(Lt,`Opening RPC '${e}' stream ${i} transport.`),f.open(),m=!0),$(Lt,`RPC '${e}' stream ${i} sending:`,C),f.send(C))},To:()=>f.close()}),R=(C,V,D)=>{C.listen(V,(x=>{try{D(x)}catch(M){setTimeout((()=>{throw M}),0)}}))};return R(f,oa.EventType.OPEN,(()=>{g||($(Lt,`RPC '${e}' stream ${i} transport opened.`),b.yo())})),R(f,oa.EventType.CLOSE,(()=>{g||(g=!0,$(Lt,`RPC '${e}' stream ${i} transport closed`),b.So())})),R(f,oa.EventType.ERROR,(C=>{g||(g=!0,mn(Lt,`RPC '${e}' stream ${i} transport errored:`,C),b.So(new K(L.UNAVAILABLE,"The operation could not be completed")))})),R(f,oa.EventType.MESSAGE,(C=>{var V;if(!g){const D=C.data[0];se(!!D);const x=D,M=x.error||((V=x[0])===null||V===void 0?void 0:V.error);if(M){$(Lt,`RPC '${e}' stream ${i} received error:`,M);const H=M.status;let j=(function(y){const v=pt[y];if(v!==void 0)return qE(v)})(H),E=M.message;j===void 0&&(j=L.INTERNAL,E="Unknown error status: "+H+" with message "+M.message),g=!0,b.So(new K(j,E)),f.close()}else $(Lt,`RPC '${e}' stream ${i} received:`,D),b.bo(D)}})),R(a,zv.STAT_EVENT,(C=>{C.stat===wd.PROXY?$(Lt,`RPC '${e}' stream ${i} detected buffering proxy`):C.stat===wd.NOPROXY&&$(Lt,`RPC '${e}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{b.wo()}),0),b}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function AT(){return typeof window<"u"?window:null}function _u(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mc(n){return new hD(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(e,t,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&$("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{constructor(e,t,r,i,s,o,a,c){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Wf(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===L.RESOURCE_EXHAUSTED?(lt(t.toString()),lt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,i])=>{this.Yo===t&&this.P_(r,i)}),(r=>{e((()=>{const i=new K(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)}))}))}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo((()=>{r((()=>this.listener.Eo()))})),this.stream.Ro((()=>{r((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((i=>{r((()=>this.I_(i)))})),this.stream.onMessage((i=>{r((()=>++this.e_==1?this.E_(i):this.onNext(i)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(e){return $("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget((()=>this.Yo===e?t():($("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class ik extends bT{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=pD(this.serializer,e),r=(function(s){if(!("targetChange"in s))return ae.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?ae.min():o.readTime?dt(o.readTime):ae.min()})(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=Od(this.serializer),t.addTarget=(function(s,o){let a;const c=o.target;if(a=Ou(c)?{documents:YE(s,c)}:{query:Rl(s,c)._t},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=$E(s,o.resumeToken);const l=Nd(s,o.expectedCount);l!==null&&(a.expectedCount=l)}else if(o.snapshotVersion.compareTo(ae.min())>0){a.readTime=Zs(s,o.snapshotVersion.toTimestamp());const l=Nd(s,o.expectedCount);l!==null&&(a.expectedCount=l)}return a})(this.serializer,e);const r=gD(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=Od(this.serializer),t.removeTarget=e,this.a_(t)}}class sk extends bT{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return se(!!e.streamToken),this.lastStreamToken=e.streamToken,se(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){se(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=mD(e.writeResults,e.commitTime),r=dt(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=Od(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>Ha(this.serializer,r)))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ok extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new K(L.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,o])=>this.connection.Mo(e,Vd(t,r),i,s,o))).catch((s=>{throw s.name==="FirebaseError"?(s.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new K(L.UNKNOWN,s.toString())}))}Lo(e,t,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Lo(e,Vd(t,r),i,o,a,s))).catch((o=>{throw o.name==="FirebaseError"?(o.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new K(L.UNKNOWN,o.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class ak{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
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
 */class ck{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o((o=>{r.enqueueAndForget((async()=>{Ei(this)&&($("RemoteStore","Restarting streams for network reachability change."),await(async function(c){const l=J(c);l.L_.add(4),await yo(l),l.q_.set("Unknown"),l.L_.delete(4),await gc(l)})(this))}))})),this.q_=new ak(r,i)}}async function gc(n){if(Ei(n))for(const e of n.B_)await e(!0)}async function yo(n){for(const e of n.B_)await e(!1)}function Dl(n,e){const t=J(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Yf(t)?Jf(t):vo(t).r_()&&Qf(t,e))}function no(n,e){const t=J(n),r=vo(t);t.N_.delete(e),r.r_()&&RT(t,e),t.N_.size===0&&(r.r_()?r.o_():Ei(t)&&t.q_.set("Unknown"))}function Qf(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(ae.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}vo(n).A_(e)}function RT(n,e){n.Q_.xe(e),vo(n).R_(e)}function Jf(n){n.Q_=new aD({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),vo(n).start(),n.q_.v_()}function Yf(n){return Ei(n)&&!vo(n).n_()&&n.N_.size>0}function Ei(n){return J(n).L_.size===0}function ST(n){n.Q_=void 0}async function uk(n){n.q_.set("Online")}async function lk(n){n.N_.forEach(((e,t)=>{Qf(n,e)}))}async function hk(n,e){ST(n),Yf(n)?(n.q_.M_(e),Jf(n)):n.q_.set("Unknown")}async function dk(n,e,t){if(n.q_.set("Online"),e instanceof KE&&e.state===2&&e.cause)try{await(async function(i,s){const o=s.cause;for(const a of s.targetIds)i.N_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.N_.delete(a),i.Q_.removeTarget(a))})(n,e)}catch(r){$("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await $u(n,r)}else if(e instanceof gu?n.Q_.Ke(e):e instanceof GE?n.Q_.He(e):n.Q_.We(e),!t.isEqual(ae.min()))try{const r=await yT(n.localStore);t.compareTo(r)>=0&&await(function(s,o){const a=s.Q_.rt(o);return a.targetChanges.forEach(((c,l)=>{if(c.resumeToken.approximateByteSize()>0){const h=s.N_.get(l);h&&s.N_.set(l,h.withResumeToken(c.resumeToken,o))}})),a.targetMismatches.forEach(((c,l)=>{const h=s.N_.get(c);if(!h)return;s.N_.set(c,h.withResumeToken(tt.EMPTY_BYTE_STRING,h.snapshotVersion)),RT(s,c);const f=new dr(h.target,c,l,h.sequenceNumber);Qf(s,f)})),s.remoteSyncer.applyRemoteEvent(a)})(n,t)}catch(r){$("RemoteStore","Failed to raise snapshot:",r),await $u(n,r)}}async function $u(n,e,t){if(!Ii(e))throw e;n.L_.add(1),await yo(n),n.q_.set("Offline"),t||(t=()=>yT(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{$("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await gc(n)}))}function PT(n,e){return e().catch((t=>$u(n,t,e)))}async function Io(n){const e=J(n),t=fi(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;fk(e);)try{const i=await YD(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,pk(e,i)}catch(i){await $u(e,i)}CT(e)&&DT(e)}function fk(n){return Ei(n)&&n.O_.length<10}function pk(n,e){n.O_.push(e);const t=fi(n);t.r_()&&t.V_&&t.m_(e.mutations)}function CT(n){return Ei(n)&&!fi(n).n_()&&n.O_.length>0}function DT(n){fi(n).start()}async function mk(n){fi(n).p_()}async function gk(n){const e=fi(n);for(const t of n.O_)e.m_(t.mutations)}async function _k(n,e,t){const r=n.O_.shift(),i=xf.from(r,e,t);await PT(n,(()=>n.remoteSyncer.applySuccessfulWrite(i))),await Io(n)}async function yk(n,e){e&&fi(n).V_&&await(async function(r,i){if((function(o){return BE(o)&&o!==L.ABORTED})(i.code)){const s=r.O_.shift();fi(r).s_(),await PT(r,(()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i))),await Io(r)}})(n,e),CT(n)&&DT(n)}async function K_(n,e){const t=J(n);t.asyncQueue.verifyOperationInProgress(),$("RemoteStore","RemoteStore received new credentials");const r=Ei(t);t.L_.add(3),await yo(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await gc(t)}async function Bd(n,e){const t=J(n);e?(t.L_.delete(2),await gc(t)):e||(t.L_.add(2),await yo(t),t.q_.set("Unknown"))}function vo(n){return n.K_||(n.K_=(function(t,r,i){const s=J(t);return s.w_(),new ik(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Eo:uk.bind(null,n),Ro:lk.bind(null,n),mo:hk.bind(null,n),d_:dk.bind(null,n)}),n.B_.push((async e=>{e?(n.K_.s_(),Yf(n)?Jf(n):n.q_.set("Unknown")):(await n.K_.stop(),ST(n))}))),n.K_}function fi(n){return n.U_||(n.U_=(function(t,r,i){const s=J(t);return s.w_(),new sk(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:mk.bind(null,n),mo:yk.bind(null,n),f_:gk.bind(null,n),g_:_k.bind(null,n)}),n.B_.push((async e=>{e?(n.U_.s_(),await Io(n)):(await n.U_.stop(),n.O_.length>0&&($("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))}))),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new At,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,a=new Xf(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new K(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Eo(n,e){if(lt("AsyncQueue",`${e}: ${n}`),Ii(n))return new K(L.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class $_{constructor(){this.W_=new qe(Z.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):re():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal(((t,r)=>{e.push(r)})),e}}class ro{constructor(e,t,r,i,s,o,a,c,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach((a=>{o.push({type:0,doc:a})})),new ro(e,t,Bs.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&lc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ik{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((e=>e.J_()))}}class vk{constructor(){this.queries=z_(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=J(t),s=i.queries;i.queries=z_(),s.forEach(((o,a)=>{for(const c of a.j_)c.onError(r)}))})(this,new K(L.ABORTED,"Firestore shutting down"))}}function z_(){return new Cr((n=>bE(n)),lc)}async function Zf(n,e){const t=J(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new Ik,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const a=Eo(o,`Initialization of query '${Ds(e.query)}' failed`);return void e.onError(a)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&tp(t)}async function ep(n,e){const t=J(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Ek(n,e){const t=J(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const a of o.j_)a.X_(i)&&(r=!0);o.z_=i}}r&&tp(t)}function Tk(n,e,t){const r=J(n),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(t);r.queries.delete(e)}function tp(n){n.Y_.forEach((e=>{e.next()}))}var qd,H_;(H_=qd||(qd={})).ea="default",H_.Cache="cache";class np{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new ro(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=ro.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==qd.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wk{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(e){this.serializer=e}Es(e){return Wn(this.serializer,e)}ds(e){return e.metadata.exists?JE(this.serializer,e.document,!1):Ge.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return dt(e)}}class Ak{constructor(e,t,r){this.ca=e,this.localStore=t,this.serializer=r,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=kT(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const r=Ae.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,r=new W_(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Es(i.metadata.name);for(const o of i.metadata.queries){const a=(t.get(o)||Ie()).add(s);t.set(o,a)}}return t}async complete(){const e=await XD(this.localStore,new W_(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const r of this.queries)await ZD(this.localStore,r,t.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function kT(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NT{constructor(e){this.key=e}}class VT{constructor(e){this.key=e}}class OT{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Ie(),this.mutatedKeys=Ie(),this.Aa=SE(e),this.Ra=new Bs(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new $_,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((h,f)=>{const m=i.get(h),g=hc(this.query,f)?f:null,b=!!m&&this.mutatedKeys.has(m.key),R=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let C=!1;m&&g?m.data.isEqual(g.data)?b!==R&&(r.track({type:3,doc:g}),C=!0):this.ga(m,g)||(r.track({type:2,doc:g}),C=!0,(c&&this.Aa(g,c)>0||l&&this.Aa(g,l)<0)&&(a=!0)):!m&&g?(r.track({type:0,doc:g}),C=!0):m&&!g&&(r.track({type:1,doc:m}),C=!0,(c||l)&&(a=!0)),C&&(g?(o=o.add(g),s=R?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),r.track({type:1,doc:h})}return{Ra:o,fa:r,ns:a,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort(((h,f)=>(function(g,b){const R=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return re()}};return R(g)-R(b)})(h.type,f.type)||this.Aa(h.doc,f.doc))),this.pa(r),i=i!=null&&i;const a=t&&!i?this.ya():[],c=this.da.size===0&&this.current&&!i?1:0,l=c!==this.Ea;return this.Ea=c,o.length!==0||l?{snapshot:new ro(this.query,e.Ra,s,o,e.mutatedKeys,c===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:a}:{wa:a}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new $_,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach((t=>this.Ta=this.Ta.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ta=this.Ta.delete(t))),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Ie(),this.Ra.forEach((r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))}));const t=[];return e.forEach((r=>{this.da.has(r)||t.push(new VT(r))})),this.da.forEach((r=>{e.has(r)||t.push(new NT(r))})),t}ba(e){this.Ta=e.Ts,this.da=Ie();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return ro.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class bk{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class Rk{constructor(e){this.key=e,this.va=!1}}class Sk{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Cr((a=>bE(a)),lc),this.Ma=new Map,this.xa=new Set,this.Oa=new qe(Z.comparator),this.Na=new Map,this.La=new jf,this.Ba={},this.ka=new Map,this.qa=os.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Pk(n,e,t=!0){const r=kl(n);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await xT(r,e,t,!0),i}async function Ck(n,e){const t=kl(n);await xT(t,e,!0,!1)}async function xT(n,e,t,r){const i=await eo(n.localStore,Gt(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let a;return r&&(a=await rp(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Dl(n.remoteStore,i),a}async function rp(n,e,t,r,i){n.Ka=(f,m,g)=>(async function(R,C,V,D){let x=C.view.ma(V);x.ns&&(x=await ju(R.localStore,C.query,!1).then((({documents:E})=>C.view.ma(E,x))));const M=D&&D.targetChanges.get(C.targetId),H=D&&D.targetMismatches.get(C.targetId)!=null,j=C.view.applyChanges(x,R.isPrimaryClient,M,H);return jd(R,C.targetId,j.wa),j.snapshot})(n,f,m,g);const s=await ju(n.localStore,e,!0),o=new OT(e,s.Ts),a=o.ma(s.documents),c=pc.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),l=o.applyChanges(a,n.isPrimaryClient,c);jd(n,t,l.wa);const h=new bk(e,t,o);return n.Fa.set(e,h),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),l.snapshot}async function Dk(n,e,t){const r=J(n),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter((o=>!lc(o,e)))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await to(r.localStore,i.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(i.targetId),t&&no(r.remoteStore,i.targetId),io(r,i.targetId)})).catch(yi)):(io(r,i.targetId),await to(r.localStore,i.targetId,!0))}async function kk(n,e){const t=J(n),r=t.Fa.get(e),i=t.Ma.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),no(t.remoteStore,r.targetId))}async function Nk(n,e,t){const r=ap(n);try{const i=await(function(o,a){const c=J(o),l=Je.now(),h=a.reduce(((g,b)=>g.add(b.key)),Ie());let f,m;return c.persistence.runTransaction("Locally write mutations","readwrite",(g=>{let b=tn(),R=Ie();return c.cs.getEntries(g,h).next((C=>{b=C,b.forEach(((V,D)=>{D.isValidDocument()||(R=R.add(V))}))})).next((()=>c.localDocuments.getOverlayedDocuments(g,b))).next((C=>{f=C;const V=[];for(const D of a){const x=iD(D,f.get(D.key).overlayedDocument);x!=null&&V.push(new Dr(D.key,x,pE(x.value.mapValue),Qe.exists(!0)))}return c.mutationQueue.addMutationBatch(g,l,V,a)})).next((C=>{m=C;const V=C.applyToLocalDocumentSet(f,R);return c.documentOverlayCache.saveOverlays(g,C.batchId,V)}))})).then((()=>({batchId:m.batchId,changes:CE(f)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),(function(o,a,c){let l=o.Ba[o.currentUser.toKey()];l||(l=new qe(me)),l=l.insert(a,c),o.Ba[o.currentUser.toKey()]=l})(r,i.batchId,t),await kr(r,i.changes),await Io(r.remoteStore)}catch(i){const s=Eo(i,"Failed to persist write");t.reject(s)}}async function LT(n,e){const t=J(n);try{const r=await JD(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const o=t.Na.get(s);o&&(se(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?se(o.va):i.removedDocuments.size>0&&(se(o.va),o.va=!1))})),await kr(t,r,e)}catch(r){await yi(r)}}function Q_(n,e,t){const r=J(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach(((s,o)=>{const a=o.view.Z_(e);a.snapshot&&i.push(a.snapshot)})),(function(o,a){const c=J(o);c.onlineState=a;let l=!1;c.queries.forEach(((h,f)=>{for(const m of f.j_)m.Z_(a)&&(l=!0)})),l&&tp(c)})(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Vk(n,e,t){const r=J(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new qe(Z.comparator);o=o.insert(s,Ge.newNoDocument(s,ae.min()));const a=Ie().add(s),c=new fc(ae.min(),new Map,new qe(me),o,a);await LT(r,c),r.Oa=r.Oa.remove(s),r.Na.delete(e),op(r)}else await to(r.localStore,e,!1).then((()=>io(r,e,t))).catch(yi)}async function Ok(n,e){const t=J(n),r=e.batch.batchId;try{const i=await QD(t.localStore,e);sp(t,r,null),ip(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await kr(t,i)}catch(i){await yi(i)}}async function xk(n,e,t){const r=J(n);try{const i=await(function(o,a){const c=J(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(l=>{let h;return c.mutationQueue.lookupMutationBatch(l,a).next((f=>(se(f!==null),h=f.keys(),c.mutationQueue.removeMutationBatch(l,f)))).next((()=>c.mutationQueue.performConsistencyCheck(l))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(l,h,a))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,h))).next((()=>c.localDocuments.getDocuments(l,h)))}))})(r.localStore,e);sp(r,e,t),ip(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await kr(r,i)}catch(i){await yi(i)}}async function Lk(n,e){const t=J(n);Ei(t.remoteStore)||$("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await(function(o){const a=J(o);return a.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(c=>a.mutationQueue.getHighestUnacknowledgedBatchId(c)))})(t.localStore);if(r===-1)return void e.resolve();const i=t.ka.get(r)||[];i.push(e),t.ka.set(r,i)}catch(r){const i=Eo(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function ip(n,e){(n.ka.get(e)||[]).forEach((t=>{t.resolve()})),n.ka.delete(e)}function sp(n,e,t){const r=J(n);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function io(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach((r=>{n.La.containsKey(r)||MT(n,r)}))}function MT(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(no(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),op(n))}function jd(n,e,t){for(const r of t)r instanceof NT?(n.La.addReference(r.key,e),Mk(n,r)):r instanceof VT?($("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||MT(n,r.key)):re()}function Mk(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||($("SyncEngine","New document in limbo: "+t),n.xa.add(r),op(n))}function op(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new Z(Ae.fromString(e)),r=n.qa.next();n.Na.set(r,new Rk(t)),n.Oa=n.Oa.insert(t,r),Dl(n.remoteStore,new dr(Gt(mo(t.path)),r,"TargetPurposeLimboResolution",Zt.oe))}}async function kr(n,e,t){const r=J(n),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach(((a,c)=>{o.push(r.Ka(c,e,t).then((l=>{var h;if((l||t)&&r.isPrimaryClient){const f=l?!l.fromCache:(h=t==null?void 0:t.targetChanges.get(c.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(l){i.push(l);const f=zf.Wi(c.targetId,l);s.push(f)}})))})),await Promise.all(o),r.Ca.d_(i),await(async function(c,l){const h=J(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(f=>N.forEach(l,(m=>N.forEach(m.$i,(g=>h.persistence.referenceDelegate.addReference(f,m.targetId,g))).next((()=>N.forEach(m.Ui,(g=>h.persistence.referenceDelegate.removeReference(f,m.targetId,g)))))))))}catch(f){if(!Ii(f))throw f;$("LocalStore","Failed to update sequence numbers: "+f)}for(const f of l){const m=f.targetId;if(!f.fromCache){const g=h.os.get(m),b=g.snapshotVersion,R=g.withLastLimboFreeSnapshotVersion(b);h.os=h.os.insert(m,R)}}})(r.localStore,s))}async function Fk(n,e){const t=J(n);if(!t.currentUser.isEqual(e)){$("SyncEngine","User change. New user:",e.toKey());const r=await _T(t.localStore,e);t.currentUser=e,(function(s,o){s.ka.forEach((a=>{a.forEach((c=>{c.reject(new K(L.CANCELLED,o))}))})),s.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await kr(t,r.hs)}}function Uk(n,e){const t=J(n),r=t.Na.get(e);if(r&&r.va)return Ie().add(r.key);{let i=Ie();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const a=t.Fa.get(o);i=i.unionWith(a.view.Va)}return i}}async function Bk(n,e){const t=J(n),r=await ju(t.localStore,e.query,!0),i=e.view.ba(r);return t.isPrimaryClient&&jd(t,e.targetId,i.wa),i}async function qk(n,e){const t=J(n);return ET(t.localStore,e).then((r=>kr(t,r)))}async function jk(n,e,t,r){const i=J(n),s=await(function(a,c){const l=J(a),h=J(l.mutationQueue);return l.persistence.runTransaction("Lookup mutation documents","readonly",(f=>h.Mn(f,c).next((m=>m?l.localDocuments.getDocuments(f,m):N.resolve(null)))))})(i.localStore,e);s!==null?(t==="pending"?await Io(i.remoteStore):t==="acknowledged"||t==="rejected"?(sp(i,e,r||null),ip(i,e),(function(a,c){J(J(a).mutationQueue).On(c)})(i.localStore,e)):re(),await kr(i,s)):$("SyncEngine","Cannot apply mutation batch with id: "+e)}async function Gk(n,e){const t=J(n);if(kl(t),ap(t),e===!0&&t.Qa!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await J_(t,r.toArray());t.Qa=!0,await Bd(t.remoteStore,!0);for(const s of i)Dl(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const r=[];let i=Promise.resolve();t.Ma.forEach(((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then((()=>(io(t,o),to(t.localStore,o,!0)))),no(t.remoteStore,o)})),await i,await J_(t,r),(function(o){const a=J(o);a.Na.forEach(((c,l)=>{no(a.remoteStore,l)})),a.La.pr(),a.Na=new Map,a.Oa=new qe(Z.comparator)})(t),t.Qa=!1,await Bd(t.remoteStore,!1)}}async function J_(n,e,t){const r=J(n),i=[],s=[];for(const o of e){let a;const c=r.Ma.get(o);if(c&&c.length!==0){a=await eo(r.localStore,Gt(c[0]));for(const l of c){const h=r.Fa.get(l),f=await Bk(r,h);f.snapshot&&s.push(f.snapshot)}}else{const l=await vT(r.localStore,o);a=await eo(r.localStore,l),await rp(r,FT(l),o,!1,a.resumeToken)}i.push(a)}return r.Ca.d_(s),i}function FT(n){return TE(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function Kk(n){return(function(t){return J(J(t).persistence).Qi()})(J(n).localStore)}async function $k(n,e,t,r){const i=J(n);if(i.Qa)return void $("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await ET(i.localStore,RE(s[0])),a=fc.createSynthesizedRemoteEventForCurrentChange(e,t==="current",tt.EMPTY_BYTE_STRING);await kr(i,o,a);break}case"rejected":await to(i.localStore,e,!0),io(i,e,r);break;default:re()}}async function zk(n,e,t){const r=kl(n);if(r.Qa){for(const i of e){if(r.Ma.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){$("SyncEngine","Adding an already active target "+i);continue}const s=await vT(r.localStore,i),o=await eo(r.localStore,s);await rp(r,FT(s),o.targetId,!1,o.resumeToken),Dl(r.remoteStore,o)}for(const i of t)r.Ma.has(i)&&await to(r.localStore,i,!1).then((()=>{no(r.remoteStore,i),io(r,i)})).catch(yi)}}function kl(n){const e=J(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=LT.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Uk.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Vk.bind(null,e),e.Ca.d_=Ek.bind(null,e.eventManager),e.Ca.$a=Tk.bind(null,e.eventManager),e}function ap(n){const e=J(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Ok.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=xk.bind(null,e),e}function Hk(n,e,t){const r=J(n);(async function(s,o,a){try{const c=await o.getMetadata();if(await(function(g,b){const R=J(g),C=dt(b.createTime);return R.persistence.runTransaction("hasNewerBundle","readonly",(V=>R.Gr.getBundleMetadata(V,b.id))).then((V=>!!V&&V.createTime.compareTo(C)>=0))})(s.localStore,c))return await o.close(),a._completeWith((function(g){return{taskState:"Success",documentsLoaded:g.totalDocuments,bytesLoaded:g.totalBytes,totalDocuments:g.totalDocuments,totalBytes:g.totalBytes}})(c)),Promise.resolve(new Set);a._updateProgress(kT(c));const l=new Ak(c,s.localStore,o.serializer);let h=await o.Ua();for(;h;){const m=await l.la(h);m&&a._updateProgress(m),h=await o.Ua()}const f=await l.complete();return await kr(s,f.Ia,void 0),await(function(g,b){const R=J(g);return R.persistence.runTransaction("Save bundle","readwrite",(C=>R.Gr.saveBundleMetadata(C,b)))})(s.localStore,c),a._completeWith(f.progress),Promise.resolve(f.Pa)}catch(c){return mn("SyncEngine",`Loading bundle failed with ${c}`),a._failWith(c),Promise.resolve(new Set)}})(r,e,t).then((i=>{r.sharedClientState.notifyBundleLoaded(i)}))}class pi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=mc(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return gT(this.persistence,new mT,e.initialUser,this.serializer)}Ga(e){return new Gf(Cl.Zr,this.serializer)}Wa(e){return new wT}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}pi.provider={build:()=>new pi};class Wk extends pi{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){se(this.persistence.referenceDelegate instanceof qu);const r=this.persistence.referenceDelegate.garbageCollector;return new lT(r,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?Mt.withCacheSize(this.cacheSizeBytes):Mt.DEFAULT;return new Gf((r=>qu.Zr(r,t)),this.serializer)}}class cp extends pi{constructor(e,t,r){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await ap(this.Ja.syncEngine),await Io(this.Ja.remoteStore),await this.persistence.yi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}za(e){return gT(this.persistence,new mT,e.initialUser,this.serializer)}ja(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new lT(r,e.asyncQueue,t)}Ha(e,t){const r=new mC(t,this.persistence);return new pC(e.asyncQueue,r)}Ga(e){const t=$f(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Mt.withCacheSize(this.cacheSizeBytes):Mt.DEFAULT;return new Kf(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,AT(),_u(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new wT}}class UT extends cp{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof Uh&&(this.sharedClientState.syncEngine={no:jk.bind(null,t),ro:$k.bind(null,t),io:zk.bind(null,t),Qi:Kk.bind(null,t),eo:qk.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi((async r=>{await Gk(this.Ja.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())}))}Wa(e){const t=AT();if(!Uh.D(t))throw new K(L.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=$f(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Uh(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class mi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Q_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Fk.bind(null,this.syncEngine),await Bd(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new vk})()}createDatastore(e){const t=mc(e.databaseInfo.databaseId),r=(function(s){return new rk(s)})(e.databaseInfo);return(function(s,o,a,c){return new ok(s,o,a,c)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,i,s,o,a){return new ck(r,i,s,o,a)})(this.localStore,this.datastore,e.asyncQueue,(t=>Q_(this.syncEngine,t,0)),(function(){return G_.D()?new G_:new ek})())}createSyncEngine(e,t){return(function(i,s,o,a,c,l,h){const f=new Sk(i,s,o,a,c,l);return h&&(f.Qa=!0),f})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const s=J(i);$("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await yo(s),s.k_.shutdown(),s.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}mi.provider={build:()=>new mi};function Y_(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Nl{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):lt("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qk{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new At,this.buffer=new Uint8Array,this.eu=(function(){return new TextDecoder("utf-8")})(),this.tu().then((r=>{r&&r.ua()?this.metadata.resolve(r.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.aa)}`))}),(r=>this.metadata.reject(r)))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),r=Number(t);isNaN(r)&&this.ru(`length string (${t}) is not valid number`);const i=await this.iu(r);return new wk(JSON.parse(i),e.length+r)}su(){return this.buffer.findIndex((e=>e===123))}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jk{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new K(L.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(i,s){const o=J(i),a={documents:s.map((f=>za(o.serializer,f)))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,Ae.emptyPath(),a,s.length),l=new Map;c.forEach((f=>{const m=fD(o.serializer,f);l.set(m.key.toString(),m)}));const h=[];return s.forEach((f=>{const m=l.get(f.toString());se(!!m),h.push(m)})),h})(this.datastore,e);return t.forEach((r=>this.recordVersion(r))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new _o(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,r)=>{const i=Z.fromPath(r);this.mutations.push(new Vf(i,this.precondition(i)))})),await(async function(r,i){const s=J(r),o={writes:i.map((a=>Ha(s.serializer,a)))};await s.Mo("Commit",s.serializer.databaseId,Ae.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw re();t=ae.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new K(L.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(ae.min())?Qe.exists(!1):Qe.updateTime(t):Qe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(ae.min()))throw new K(L.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Qe.updateTime(t)}return Qe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class Yk{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this._u=r.maxAttempts,this.t_=new Wf(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go((async()=>{const e=new Jk(this.datastore),t=this.cu(e);t&&t.then((r=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(r)})).catch((i=>{this.lu(i)}))))})).catch((r=>{this.lu(r)}))}))}cu(e){try{const t=this.updateFunction(e);return!cc(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget((()=>(this.uu(),Promise.resolve())))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!BE(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xk{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=wt.UNAUTHENTICATED,this.clientId=bf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,(async o=>{$("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>($("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new At;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Eo(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function qh(n,e){n.asyncQueue.verifyOperationInProgress(),$("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async i=>{r.isEqual(i)||(await _T(e.localStore,i),r=i)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function X_(n,e){n.asyncQueue.verifyOperationInProgress();const t=await up(n);$("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>K_(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,i)=>K_(e.remoteStore,i))),n._onlineComponents=e}async function up(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){$("FirestoreClient","Using user provided OfflineComponentProvider");try{await qh(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===L.FAILED_PRECONDITION||i.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;mn("Error using user provided cache. Falling back to memory cache: "+t),await qh(n,new pi)}}else $("FirestoreClient","Using default OfflineComponentProvider"),await qh(n,new pi);return n._offlineComponents}async function Vl(n){return n._onlineComponents||(n._uninitializedComponentsProvider?($("FirestoreClient","Using user provided OnlineComponentProvider"),await X_(n,n._uninitializedComponentsProvider._online)):($("FirestoreClient","Using default OnlineComponentProvider"),await X_(n,new mi))),n._onlineComponents}function BT(n){return up(n).then((e=>e.persistence))}function To(n){return up(n).then((e=>e.localStore))}function qT(n){return Vl(n).then((e=>e.remoteStore))}function lp(n){return Vl(n).then((e=>e.syncEngine))}function jT(n){return Vl(n).then((e=>e.datastore))}async function so(n){const e=await Vl(n),t=e.eventManager;return t.onListen=Pk.bind(null,e.syncEngine),t.onUnlisten=Dk.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Ck.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=kk.bind(null,e.syncEngine),t}function Zk(n){return n.asyncQueue.enqueue((async()=>{const e=await BT(n),t=await qT(n);return e.setNetworkEnabled(!0),(function(i){const s=J(i);return s.L_.delete(0),gc(s)})(t)}))}function eN(n){return n.asyncQueue.enqueue((async()=>{const e=await BT(n),t=await qT(n);return e.setNetworkEnabled(!1),(async function(i){const s=J(i);s.L_.add(0),await yo(s),s.q_.set("Offline")})(t)}))}function tN(n,e){const t=new At;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const a=await(function(l,h){const f=J(l);return f.persistence.runTransaction("read document","readonly",(m=>f.localDocuments.getDocument(m,h)))})(i,s);a.isFoundDocument()?o.resolve(a):a.isNoDocument()?o.resolve(null):o.reject(new K(L.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(a){const c=Eo(a,`Failed to get document '${s} from cache`);o.reject(c)}})(await To(n),e,t))),t.promise}function GT(n,e,t={}){const r=new At;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,a,c,l){const h=new Nl({next:m=>{h.Za(),o.enqueueAndForget((()=>ep(s,f)));const g=m.docs.has(a);!g&&m.fromCache?l.reject(new K(L.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&m.fromCache&&c&&c.source==="server"?l.reject(new K(L.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(m)},error:m=>l.reject(m)}),f=new np(mo(a.path),h,{includeMetadataChanges:!0,_a:!0});return Zf(s,f)})(await so(n),n.asyncQueue,e,t,r))),r.promise}function nN(n,e){const t=new At;return n.asyncQueue.enqueueAndForget((async()=>(async function(i,s,o){try{const a=await ju(i,s,!0),c=new OT(s,a.Ts),l=c.ma(a.documents),h=c.applyChanges(l,!1);o.resolve(h.snapshot)}catch(a){const c=Eo(a,`Failed to execute query '${s} against cache`);o.reject(c)}})(await To(n),e,t))),t.promise}function KT(n,e,t={}){const r=new At;return n.asyncQueue.enqueueAndForget((async()=>(function(s,o,a,c,l){const h=new Nl({next:m=>{h.Za(),o.enqueueAndForget((()=>ep(s,f))),m.fromCache&&c.source==="server"?l.reject(new K(L.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(m)},error:m=>l.reject(m)}),f=new np(a,h,{includeMetadataChanges:!0,_a:!0});return Zf(s,f)})(await so(n),n.asyncQueue,e,t,r))),r.promise}function rN(n,e,t){const r=new At;return n.asyncQueue.enqueueAndForget((async()=>{try{const i=await jT(n);r.resolve((async function(o,a,c){var l;const h=J(o),{request:f,ut:m,parent:g}=XE(h.serializer,wE(a),c);h.connection.Fo||delete f.parent;const b=(await h.Lo("RunAggregationQuery",h.serializer.databaseId,g,f,1)).filter((C=>!!C.result));se(b.length===1);const R=(l=b[0].result)===null||l===void 0?void 0:l.aggregateFields;return Object.keys(R).reduce(((C,V)=>(C[m[V]]=R[V],C)),{})})(i,e,t))}catch(i){r.reject(i)}})),r.promise}function iN(n,e){const t=new Nl(e);return n.asyncQueue.enqueueAndForget((async()=>(function(i,s){J(i).Y_.add(s),s.next()})(await so(n),t))),()=>{t.Za(),n.asyncQueue.enqueueAndForget((async()=>(function(i,s){J(i).Y_.delete(s)})(await so(n),t)))}}function sN(n,e,t,r){const i=(function(o,a){let c;return c=typeof o=="string"?jE().encode(o):o,(function(h,f){return new Qk(h,f)})((function(h,f){if(h instanceof Uint8Array)return Y_(h,f);if(h instanceof ArrayBuffer)return Y_(new Uint8Array(h),f);if(h instanceof ReadableStream)return h.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(c),a)})(t,mc(e));n.asyncQueue.enqueueAndForget((async()=>{Hk(await lp(n),i,r)}))}function oN(n,e){return n.asyncQueue.enqueue((async()=>(function(r,i){const s=J(r);return s.persistence.runTransaction("Get named query","readonly",(o=>s.Gr.getNamedQuery(o,i)))})(await To(n),e)))}function aN(n,e){return n.asyncQueue.enqueue((async()=>(async function(r,i){const s=J(r),o=s.indexManager,a=[];return s.persistence.runTransaction("Configure indexes","readwrite",(c=>o.getFieldIndexes(c).next((l=>(function(f,m,g,b,R){f=[...f],m=[...m],f.sort(g),m.sort(g);const C=f.length,V=m.length;let D=0,x=0;for(;D<V&&x<C;){const M=g(f[x],m[D]);M<0?R(f[x++]):M>0?b(m[D++]):(D++,x++)}for(;D<V;)b(m[D++]);for(;x<C;)R(f[x++])})(l,i,lC,(h=>{a.push(o.addFieldIndex(c,h))}),(h=>{a.push(o.deleteFieldIndex(c,h))})))).next((()=>N.waitFor(a)))))})(await To(n),e)))}function cN(n,e){return n.asyncQueue.enqueue((async()=>(function(r,i){J(r).ss.zi=i})(await To(n),e)))}function uN(n){return n.asyncQueue.enqueue((async()=>(function(t){const r=J(t),i=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",(s=>i.deleteAllFieldIndexes(s)))})(await To(n))))}/**
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
 */function $T(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z_=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hp(n,e,t){if(!t)throw new K(L.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function zT(n,e,t,r){if(e===!0&&r===!0)throw new K(L.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ey(n){if(!Z.isDocumentKey(n))throw new K(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function ty(n){if(Z.isDocumentKey(n))throw new K(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ol(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":re()}function Ee(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new K(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ol(n);throw new K(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function HT(n,e){if(e<=0)throw new K(L.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new K(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new K(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}zT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$T((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new K(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new K(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new K(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,i){return r.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class _c{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ny({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new K(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new K(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ny(e),e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new Jv;switch(r.type){case"firstParty":return new sC(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new K(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Z_.get(t);r&&($("ComponentProvider","Removing Datastore"),Z_.delete(t),r.terminate())})(this),Promise.resolve()}}function WT(n,e,t,r={}){var i;const s=(n=Ee(n,_c))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&mn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,c;if(typeof r.mockUserToken=="string")a=r.mockUserToken,c=wt.MOCK_USER;else{a=Lv(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new K(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new wt(l)}n._authCredentials=new nC(new Qv(a,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Rt(this.firestore,e,this._query)}}class st{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Cn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new st(this.firestore,e,this._key)}}class Cn extends Rt{constructor(e,t,r){super(e,t,mo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new st(this.firestore,null,new Z(e))}withConverter(e){return new Cn(this.firestore,e,this._path)}}function Ar(n,e,...t){if(n=oe(n),hp("collection","path",e),n instanceof _c){const r=Ae.fromString(e,...t);return ty(r),new Cn(n,null,r)}{if(!(n instanceof st||n instanceof Cn))throw new K(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ae.fromString(e,...t));return ty(r),new Cn(n.firestore,null,r)}}function lN(n,e){if(n=Ee(n,_c),hp("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new K(L.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new Rt(n,null,(function(r){return new Pr(Ae.emptyPath(),r)})(e))}function fn(n,e,...t){if(n=oe(n),arguments.length===1&&(e=bf.newId()),hp("doc","path",e),n instanceof _c){const r=Ae.fromString(e,...t);return ey(r),new st(n,null,new Z(r))}{if(!(n instanceof st||n instanceof Cn))throw new K(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(Ae.fromString(e,...t));return ey(r),new st(n.firestore,n instanceof Cn?n.converter:null,new Z(r))}}function hN(n,e){return n=oe(n),e=oe(e),(n instanceof st||n instanceof Cn)&&(e instanceof st||e instanceof Cn)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function dp(n,e){return n=oe(n),e=oe(e),n instanceof Rt&&e instanceof Rt&&n.firestore===e.firestore&&lc(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Wf(this,"async_queue_retry"),this.Vu=()=>{const r=_u();r&&$("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=_u();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=_u();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new At;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ii(e))throw e;$("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((r=>{this.Eu=r,this.du=!1;const i=(function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a})(r);throw lt("INTERNAL UNHANDLED ERROR: ",i),r})).then((r=>(this.du=!1,r))))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=Xf.createAndSchedule(this,e,t,r,(s=>this.yu(s)));return this.Tu.push(i),i}fu(){this.Eu&&re()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Gd(n){return(function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1})(n,["next","error","complete"])}class QT{constructor(){this._progressObserver={},this._taskCompletionResolver=new At,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dN=-1;class Me extends _c{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new ry,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ry(e),this._firestoreClient=void 0,await e}}}function fN(n,e,t){t||(t="(default)");const r=fo(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(oi(s,e))return i;throw new K(L.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new K(L.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new K(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function JT(n,e){const t=typeof n=="object"?n:Il(),r=typeof n=="string"?n:e||"(default)",i=fo(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Vv("firestore");s&&WT(i,...s)}return i}function Ye(n){if(n._terminated)throw new K(L.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||YT(n),n._firestoreClient}function YT(n){var e,t,r;const i=n._freezeSettings(),s=(function(a,c,l,h){return new MC(a,c,l,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,$T(h.experimentalLongPollingOptions),h.useFetchStreams)})(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new Xk(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&(function(a){const c=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(c),_online:c}})(n._componentsProvider))}function pN(n,e){mn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return XT(n,mi.provider,{build:r=>new cp(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function mN(n){mn("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();XT(n,mi.provider,{build:t=>new UT(t,e.cacheSizeBytes)})}function XT(n,e,t){if((n=Ee(n,Me))._firestoreClient||n._terminated)throw new K(L.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new K(L.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},YT(n)}function gN(n){if(n._initialized&&!n._terminated)throw new K(L.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new At;return n._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(r){if(!Hn.D())return Promise.resolve();const i=r+"main";await Hn.delete(i)})($f(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function _N(n){return(function(t){const r=new At;return t.asyncQueue.enqueueAndForget((async()=>Lk(await lp(t),r))),r.promise})(Ye(n=Ee(n,Me)))}function yN(n){return Zk(Ye(n=Ee(n,Me)))}function IN(n){return eN(Ye(n=Ee(n,Me)))}function vN(n){return j0(n.app,"firestore",n._databaseId.database),n._delete()}function EN(n,e){const t=Ye(n=Ee(n,Me)),r=new QT;return sN(t,n._databaseId,e,r),r}function TN(n,e){return oN(Ye(n=Ee(n,Me)),e).then((t=>t?new Rt(n,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class oo{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class ZT{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e){this._byteString=e}static fromBase64String(e){try{return new gi(tt.fromBase64String(e))}catch(t){throw new K(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new gi(tt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new K(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function wN(){return new Ti("__name__")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class xl{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new K(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new K(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return me(this._lat,e._lat)||me(this._long,e._long)}}/**
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
 */const AN=/^__.*__$/;class bN{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Dr(e,this.data,this.fieldMask,t,this.fieldTransforms):new go(e,this.data,t,this.fieldTransforms)}}class ew{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Dr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function tw(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw re()}}class Ll{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Ll(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return zu(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(tw(this.Cu)&&AN.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class RN{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||mc(e)}Qu(e,t,r,i=!1){return new Ll({Cu:e,methodName:t,qu:r,path:Ke.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function hs(n){const e=n._freezeSettings(),t=mc(n._databaseId);return new RN(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ml(n,e,t,r,i,s={}){const o=n.Qu(s.merge||s.mergeFields?2:0,e,t,i);Ip("Data must be an object, but it was:",o,r);const a=iw(r,o);let c,l;if(s.merge)c=new en(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const f of s.mergeFields){const m=Wa(e,f,t);if(!o.contains(m))throw new K(L.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);ow(h,m)||h.push(m)}c=new en(h),l=o.fieldTransforms.filter((f=>c.covers(f.field)))}else c=null,l=o.fieldTransforms;return new bN(new kt(a),c,l)}class Ic extends wi{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Ic}}function nw(n,e,t){return new Ll({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class fp extends wi{_toFieldTransform(e){return new dc(e.path,new Ys)}isEqual(e){return e instanceof fp}}class pp extends wi{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=nw(this,e,!0),r=this.Ku.map((s=>ds(s,t))),i=new ns(r);return new dc(e.path,i)}isEqual(e){return e instanceof pp&&oi(this.Ku,e.Ku)}}class mp extends wi{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=nw(this,e,!0),r=this.Ku.map((s=>ds(s,t))),i=new rs(r);return new dc(e.path,i)}isEqual(e){return e instanceof mp&&oi(this.Ku,e.Ku)}}class gp extends wi{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new Xs(e.serializer,NE(e.serializer,this.$u));return new dc(e.path,t)}isEqual(e){return e instanceof gp&&this.$u===e.$u}}function _p(n,e,t,r){const i=n.Qu(1,e,t);Ip("Data must be an object, but it was:",i,r);const s=[],o=kt.empty();vi(r,((c,l)=>{const h=Fl(e,c,t);l=oe(l);const f=i.Nu(h);if(l instanceof Ic)s.push(h);else{const m=ds(l,f);m!=null&&(s.push(h),o.set(h,m))}}));const a=new en(s);return new ew(o,a,i.fieldTransforms)}function yp(n,e,t,r,i,s){const o=n.Qu(1,e,t),a=[Wa(e,r,t)],c=[i];if(s.length%2!=0)throw new K(L.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)a.push(Wa(e,s[m])),c.push(s[m+1]);const l=[],h=kt.empty();for(let m=a.length-1;m>=0;--m)if(!ow(l,a[m])){const g=a[m];let b=c[m];b=oe(b);const R=o.Nu(g);if(b instanceof Ic)l.push(g);else{const C=ds(b,R);C!=null&&(l.push(g),h.set(g,C))}}const f=new en(l);return new ew(h,f,o.fieldTransforms)}function rw(n,e,t,r=!1){return ds(t,n.Qu(r?4:3,e))}function ds(n,e){if(sw(n=oe(n)))return Ip("Unsupported field value:",e,n),iw(n,e);if(n instanceof wi)return(function(r,i){if(!tw(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return(function(r,i){const s=[];let o=0;for(const a of r){let c=ds(a,i.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),o++}return{arrayValue:{values:s}}})(n,e)}return(function(r,i){if((r=oe(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return NE(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Je.fromDate(r);return{timestampValue:Zs(i.serializer,s)}}if(r instanceof Je){const s=new Je(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Zs(i.serializer,s)}}if(r instanceof xl)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof gi)return{bytesValue:$E(i.serializer,r._byteString)};if(r instanceof st){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ff(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof yc)return(function(o,a){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map((c=>{if(typeof c!="number")throw a.Bu("VectorValues must only contain numeric values.");return Nf(a.serializer,c)}))}}}}}})(r,i);throw i.Bu(`Unsupported field value: ${Ol(r)}`)})(n,e)}function iw(n,e){const t={};return lE(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vi(n,((r,i)=>{const s=ds(i,e.Mu(r));s!=null&&(t[r]=s)})),{mapValue:{fields:t}}}function sw(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Je||n instanceof xl||n instanceof gi||n instanceof st||n instanceof wi||n instanceof yc)}function Ip(n,e,t){if(!sw(t)||!(function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)})(t)){const r=Ol(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Wa(n,e,t){if((e=oe(e))instanceof Ti)return e._internalPath;if(typeof e=="string")return Fl(n,e);throw zu("Field path arguments must be of type string or ",n,!1,void 0,t)}const SN=new RegExp("[~\\*/\\[\\]]");function Fl(n,e,t){if(e.search(SN)>=0)throw zu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ti(...e.split("."))._internalPath}catch{throw zu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function zu(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new K(L.INVALID_ARGUMENT,a+n+c)}function ow(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new st(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new PN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Ul("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class PN extends Qa{data(){return super.data()}}function Ul(n,e){return typeof e=="string"?Fl(n,e):e instanceof Ti?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new K(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class vp{}class wo extends vp{}function En(n,e,...t){let r=[];e instanceof vp&&r.push(e),r=r.concat(t),(function(s){const o=s.filter((c=>c instanceof fs)).length,a=s.filter((c=>c instanceof Ao)).length;if(o>1||o>0&&a>0)throw new K(L.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const i of r)n=i._apply(n);return n}class Ao extends wo{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ao(e,t,r)}_apply(e){const t=this._parse(e);return uw(e._query,t),new Rt(e.firestore,e.converter,kd(e._query,t))}_parse(e){const t=hs(e.firestore);return(function(s,o,a,c,l,h,f){let m;if(l.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new K(L.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){sy(f,h);const g=[];for(const b of f)g.push(iy(c,s,b));m={arrayValue:{values:g}}}else m=iy(c,s,f)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||sy(f,h),m=rw(a,o,f,h==="in"||h==="not-in");return be.create(l,h,m)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Un(n,e,t){const r=e,i=Ul("where",n);return Ao._create(i,r,t)}class fs extends vp{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new fs(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:xe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let o=i;const a=s.getFlattenedFilters();for(const c of a)uw(o,c),o=kd(o,c)})(e._query,t),new Rt(e.firestore,e.converter,kd(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function CN(...n){return n.forEach((e=>lw("or",e))),fs._create("or",n)}function DN(...n){return n.forEach((e=>lw("and",e))),fs._create("and",n)}class Bl extends wo{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Bl(e,t)}_apply(e){const t=(function(i,s,o){if(i.startAt!==null)throw new K(L.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new K(L.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new $a(s,o)})(e._query,this._field,this._direction);return new Rt(e.firestore,e.converter,(function(i,s){const o=i.explicitOrderBy.concat([s]);return new Pr(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)})(e._query,t))}}function Ep(n,e="asc"){const t=e,r=Ul("orderBy",n);return Bl._create(r,t)}class vc extends wo{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new vc(e,t,r)}_apply(e){return new Rt(e.firestore,e.converter,Lu(e._query,this._limit,this._limitType))}}function cr(n){return HT("limit",n),vc._create("limit",n,"F")}function kN(n){return HT("limitToLast",n),vc._create("limitToLast",n,"L")}class Ec extends wo{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ec(e,t,r)}_apply(e){const t=cw(e,this.type,this._docOrFields,this._inclusive);return new Rt(e.firestore,e.converter,(function(i,s){return new Pr(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)})(e._query,t))}}function NN(...n){return Ec._create("startAt",n,!0)}function VN(...n){return Ec._create("startAfter",n,!1)}class Tc extends wo{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Tc(e,t,r)}_apply(e){const t=cw(e,this.type,this._docOrFields,this._inclusive);return new Rt(e.firestore,e.converter,(function(i,s){return new Pr(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)})(e._query,t))}}function ON(...n){return Tc._create("endBefore",n,!1)}function xN(...n){return Tc._create("endAt",n,!0)}function cw(n,e,t,r){if(t[0]=oe(t[0]),t[0]instanceof Qa)return(function(s,o,a,c,l){if(!c)throw new K(L.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${a}().`);const h=[];for(const f of Us(s))if(f.field.isKeyField())h.push(es(o,c.key));else{const m=c.data.field(f.field);if(El(m))throw new K(L.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+f.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(m===null){const g=f.field.canonicalString();throw new K(L.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${g}' (used as the orderBy) does not exist.`)}h.push(m)}return new di(h,l)})(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=hs(n.firestore);return(function(o,a,c,l,h,f){const m=o.explicitOrderBy;if(h.length>m.length)throw new K(L.INVALID_ARGUMENT,`Too many arguments provided to ${l}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const g=[];for(let b=0;b<h.length;b++){const R=h[b];if(m[b].field.isKeyField()){if(typeof R!="string")throw new K(L.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${l}(), but got a ${typeof R}`);if(!Df(o)&&R.indexOf("/")!==-1)throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${l}() must be a plain document ID, but '${R}' contains a slash.`);const C=o.path.child(Ae.fromString(R));if(!Z.isDocumentKey(C))throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${l}() must result in a valid document path, but '${C}' is not because it contains an odd number of segments.`);const V=new Z(C);g.push(es(a,V))}else{const C=rw(c,l,R);g.push(C)}}return new di(g,f)})(n._query,n.firestore._databaseId,i,e,t,r)}}function iy(n,e,t){if(typeof(t=oe(t))=="string"){if(t==="")throw new K(L.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Df(e)&&t.indexOf("/")!==-1)throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(Ae.fromString(t));if(!Z.isDocumentKey(r))throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return es(n,new Z(r))}if(t instanceof st)return es(n,t._key);throw new K(L.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ol(t)}.`)}function sy(n,e){if(!Array.isArray(n)||n.length===0)throw new K(L.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function uw(n,e){const t=(function(i,s){for(const o of i)for(const a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null})(n.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new K(L.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new K(L.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function lw(n,e){if(!(e instanceof Ao||e instanceof fs))throw new K(L.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Tp{convertValue(e,t="none"){switch(li(e)){case 0:return null;case 1:return e.booleanValue;case 2:return We(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(wr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw re()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return vi(e,((i,s)=>{r[i]=this.convertValue(s,t)})),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map((o=>We(o.doubleValue)));return new yc(s)}convertGeoPoint(e){return new xl(We(e.latitude),We(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Tl(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ja(e));default:return null}}convertTimestamp(e){const t=Tr(e);return new Je(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=Ae.fromString(e);se(nT(r));const i=new ui(r.get(1),r.get(3)),s=new Z(r.popFirst(5));return i.isEqual(t)||lt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ql(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class LN extends Tp{constructor(e){super(),this.firestore=e}convertBytes(e){return new gi(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new st(this.firestore,null,t)}}/**
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
 */function MN(n){return new oo("sum",Wa("sum",n))}function FN(n){return new oo("avg",Wa("average",n))}function hw(){return new oo("count")}function UN(n,e){var t,r;return n instanceof oo&&e instanceof oo&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((r=e._internalFieldPath)===null||r===void 0?void 0:r.canonicalString())}function BN(n,e){return dp(n.query,e.query)&&oi(n.data(),e.data())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class as extends Qa{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Aa(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Ul("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Aa extends as{data(e={}){return super.data(e)}}class cs{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Zr(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new Aa(this._firestore,this._userDataWriter,r.key,r,new Zr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new K(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map((a=>{const c=new Aa(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Zr(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((a=>s||a.type!==3)).map((a=>{const c=new Aa(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Zr(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let l=-1,h=-1;return a.type!==0&&(l=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:qN(a.type),doc:c,oldIndex:l,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function qN(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return re()}}function jN(n,e){return n instanceof as&&e instanceof as?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof cs&&e instanceof cs&&n._firestore===e._firestore&&dp(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ja(n){n=Ee(n,st);const e=Ee(n.firestore,Me);return GT(Ye(e),n._key).then((t=>Ap(e,n,t)))}class Ai extends Tp{constructor(e){super(),this.firestore=e}convertBytes(e){return new gi(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new st(this.firestore,null,t)}}function GN(n){n=Ee(n,st);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ai(e);return tN(t,n._key).then((i=>new as(e,r,n._key,i,new Zr(i!==null&&i.hasLocalMutations,!0),n.converter)))}function KN(n){n=Ee(n,st);const e=Ee(n.firestore,Me);return GT(Ye(e),n._key,{source:"server"}).then((t=>Ap(e,n,t)))}function Sn(n){n=Ee(n,Rt);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ai(e);return aw(n._query),KT(t,n._query).then((i=>new cs(e,r,n,i)))}function $N(n){n=Ee(n,Rt);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ai(e);return nN(t,n._query).then((i=>new cs(e,r,n,i)))}function zN(n){n=Ee(n,Rt);const e=Ee(n.firestore,Me),t=Ye(e),r=new Ai(e);return KT(t,n._query,{source:"server"}).then((i=>new cs(e,r,n,i)))}function dw(n,e,t){n=Ee(n,st);const r=Ee(n.firestore,Me),i=ql(n.converter,e,t);return bo(r,[Ml(hs(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Qe.none())])}function wc(n,e,t,...r){n=Ee(n,st);const i=Ee(n.firestore,Me),s=hs(i);let o;return o=typeof(e=oe(e))=="string"||e instanceof Ti?yp(s,"updateDoc",n._key,e,t,r):_p(s,"updateDoc",n._key,e),bo(i,[o.toMutation(n._key,Qe.exists(!0))])}function fw(n){return bo(Ee(n.firestore,Me),[new _o(n._key,Qe.none())])}function pw(n,e){const t=Ee(n.firestore,Me),r=fn(n),i=ql(n.converter,e);return bo(t,[Ml(hs(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Qe.exists(!1))]).then((()=>r))}function wp(n,...e){var t,r,i;n=oe(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Gd(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Gd(e[o])){const f=e[o];e[o]=(t=f.next)===null||t===void 0?void 0:t.bind(f),e[o+1]=(r=f.error)===null||r===void 0?void 0:r.bind(f),e[o+2]=(i=f.complete)===null||i===void 0?void 0:i.bind(f)}let c,l,h;if(n instanceof st)l=Ee(n.firestore,Me),h=mo(n._key.path),c={next:f=>{e[o]&&e[o](Ap(l,n,f))},error:e[o+1],complete:e[o+2]};else{const f=Ee(n,Rt);l=Ee(f.firestore,Me),h=f._query;const m=new Ai(l);c={next:g=>{e[o]&&e[o](new cs(l,m,f,g))},error:e[o+1],complete:e[o+2]},aw(n._query)}return(function(m,g,b,R){const C=new Nl(R),V=new np(g,C,b);return m.asyncQueue.enqueueAndForget((async()=>Zf(await so(m),V))),()=>{C.Za(),m.asyncQueue.enqueueAndForget((async()=>ep(await so(m),V)))}})(Ye(l),h,a,c)}function HN(n,e){return iN(Ye(n=Ee(n,Me)),Gd(e)?e:{next:e})}function bo(n,e){return(function(r,i){const s=new At;return r.asyncQueue.enqueueAndForget((async()=>Nk(await lp(r),i,s))),s.promise})(Ye(n),e)}function Ap(n,e,t){const r=t.docs.get(e._key),i=new Ai(n);return new as(n,i,e._key,r,new Zr(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */function WN(n){return mw(n,{count:hw()})}function mw(n,e){const t=Ee(n.firestore,Me),r=Ye(t),i=uE(e,((s,o)=>new UE(o,s.aggregateType,s._internalFieldPath)));return rN(r,n._query,i).then((s=>(function(a,c,l){const h=new Ai(a);return new ZT(c,h,l)})(t,n,s)))}class QN{constructor(e){this.kind="memory",this._onlineComponentProvider=mi.provider,e!=null&&e.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=pi.provider}toJSON(){return{kind:this.kind}}}class JN{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=gw(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class YN{constructor(){this.kind="memoryEager",this._offlineComponentProvider=pi.provider}toJSON(){return{kind:this.kind}}}class XN{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new Wk(e)}}toJSON(){return{kind:this.kind}}}function ZN(){return new YN}function eV(n){return new XN(n==null?void 0:n.cacheSizeBytes)}function tV(n){return new QN(n)}function nV(n){return new JN(n)}class rV{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=mi.provider,this._offlineComponentProvider={build:t=>new cp(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class iV{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=mi.provider,this._offlineComponentProvider={build:t=>new UT(t,e==null?void 0:e.cacheSizeBytes)}}}function gw(n){return new rV(n==null?void 0:n.forceOwnership)}function sV(){return new iV}/**
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
 */const oV={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _w{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=hs(e)}set(e,t,r){this._verifyNotCommitted();const i=Jr(e,this._firestore),s=ql(i.converter,t,r),o=Ml(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Qe.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=Jr(e,this._firestore);let o;return o=typeof(t=oe(t))=="string"||t instanceof Ti?yp(this._dataReader,"WriteBatch.update",s._key,t,r,i):_p(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Qe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Jr(e,this._firestore);return this._mutations=this._mutations.concat(new _o(t._key,Qe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new K(L.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Jr(n,e){if((n=oe(n)).firestore!==e)throw new K(L.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class yw extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=hs(t)}get(t){const r=Jr(t,this._firestore),i=new LN(this._firestore);return this._transaction.lookup([r._key]).then((s=>{if(!s||s.length!==1)return re();const o=s[0];if(o.isFoundDocument())return new Qa(this._firestore,i,o.key,o,r.converter);if(o.isNoDocument())return new Qa(this._firestore,i,r._key,null,r.converter);throw re()}))}set(t,r,i){const s=Jr(t,this._firestore),o=ql(s.converter,r,i),a=Ml(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,a),this}update(t,r,i,...s){const o=Jr(t,this._firestore);let a;return a=typeof(r=oe(r))=="string"||r instanceof Ti?yp(this._dataReader,"Transaction.update",o._key,r,i,s):_p(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,a),this}delete(t){const r=Jr(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Jr(e,this._firestore),r=new Ai(this._firestore);return super.get(e).then((i=>new as(this._firestore,r,t._key,i._document,new Zr(!1,!1),t.converter)))}}function aV(n,e,t){n=Ee(n,Me);const r=Object.assign(Object.assign({},oV),t);return(function(s){if(s.maxAttempts<1)throw new K(L.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r),(function(s,o,a){const c=new At;return s.asyncQueue.enqueueAndForget((async()=>{const l=await jT(s);new Yk(s.asyncQueue,l,a,o,c).au()})),c.promise})(Ye(n),(i=>e(new yw(n,i))),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cV(){return new Ic("deleteField")}function uV(){return new fp("serverTimestamp")}function lV(...n){return new pp("arrayUnion",n)}function hV(...n){return new mp("arrayRemove",n)}function dV(n){return new gp("increment",n)}function fV(n){return new yc(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pV(n){return Ye(n=Ee(n,Me)),new _w(n,(e=>bo(n,e)))}/**
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
 */function mV(n,e){const t=Ye(n=Ee(n,Me));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return mn("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=(function(s){const o=typeof s=="string"?(function(l){try{return JSON.parse(l)}catch(h){throw new K(L.INVALID_ARGUMENT,"Failed to parse JSON: "+(h==null?void 0:h.message))}})(s):s,a=[];if(Array.isArray(o.indexes))for(const c of o.indexes){const l=oy(c,"collectionGroup"),h=[];if(Array.isArray(c.fields))for(const f of c.fields){const m=Fl("setIndexConfiguration",oy(f,"fieldPath"));f.arrayConfig==="CONTAINS"?h.push(new Ji(m,2)):f.order==="ASCENDING"?h.push(new Ji(m,0)):f.order==="DESCENDING"&&h.push(new Ji(m,1))}a.push(new Hs(Hs.UNKNOWN_ID,l,h,Ws.empty()))}return a})(e);return aN(t,r)}function oy(n,e){if(typeof n[e]!="string")throw new K(L.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
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
 */class Iw{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function gV(n){var e;n=Ee(n,Me);const t=ay.get(n);if(t)return t;if(((e=Ye(n)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const r=new Iw(n);return ay.set(n,r),r}function _V(n){vw(n,!0)}function yV(n){vw(n,!1)}function IV(n){uN(Ye(n._firestore)).then((e=>$("deleting all persistent cache indexes succeeded"))).catch((e=>mn("deleting all persistent cache indexes failed",e)))}function vw(n,e){cN(Ye(n._firestore),e).then((t=>$(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((t=>mn(`setting persistent cache index auto creation isEnabled=${e} failed`,t)))}const ay=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vV(n){var e;const t=(e=Ye(Ee(n.firestore,Me))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:Rl(t,Gt(n._query))._t}function EV(n,e){var t;const r=uE(e,((s,o)=>new UE(o,s.aggregateType,s._internalFieldPath))),i=(t=Ye(Ee(n.firestore,Me))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return i===void 0?null:XE(i,wE(n._query),r,!0).request}/**
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
 */class TV{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return bp.instance.onExistenceFilterMismatch(e)}}class bp{constructor(){this.Uu=new Map}static get instance(){return tu||(tu=new bp,(function(t){if(Mu)throw new Error("a TestingHooksSpi instance is already set");Mu=t})(tu)),tu}et(e){this.Uu.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.Uu;return r.set(t,e),()=>r.delete(t)}}let tu=null;(function(e,t=!0){(function(i){po=i})(ls),Zi(new ai("firestore",((r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),a=new Me(new rC(r.getProvider("auth-internal")),new oC(r.getProvider("app-check-internal")),(function(l,h){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new K(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ui(l.options.projectId,h)})(o,i),o);return s=Object.assign({useFetchStreams:t},s),a._setSettings(s),a}),"PUBLIC").setMultipleInstances(!0)),zn(Jg,"4.7.3",e),zn(Jg,"4.7.3","esm2017")})();const wV=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Tp,AggregateField:oo,AggregateQuerySnapshot:ZT,Bytes:gi,CACHE_SIZE_UNLIMITED:dN,CollectionReference:Cn,DocumentReference:st,DocumentSnapshot:as,FieldPath:Ti,FieldValue:wi,Firestore:Me,FirestoreError:K,GeoPoint:xl,LoadBundleTask:QT,PersistentCacheIndexManager:Iw,Query:Rt,QueryCompositeFilterConstraint:fs,QueryConstraint:wo,QueryDocumentSnapshot:Aa,QueryEndAtConstraint:Tc,QueryFieldFilterConstraint:Ao,QueryLimitConstraint:vc,QueryOrderByConstraint:Bl,QuerySnapshot:cs,QueryStartAtConstraint:Ec,SnapshotMetadata:Zr,Timestamp:Je,Transaction:yw,VectorValue:yc,WriteBatch:_w,_AutoId:bf,_ByteString:tt,_DatabaseId:ui,_DocumentKey:Z,_EmptyAppCheckTokenProvider:aC,_EmptyAuthCredentialsProvider:Jv,_FieldPath:Ke,_TestingHooks:TV,_cast:Ee,_debugAssert:tC,_internalAggregationQueryToProtoRunAggregationQueryRequest:EV,_internalQueryToProtoQueryTarget:vV,_isBase64Available:xC,_logWarn:mn,_validateIsNotUsedTogether:zT,addDoc:pw,aggregateFieldEqual:UN,aggregateQuerySnapshotEqual:BN,and:DN,arrayRemove:hV,arrayUnion:lV,average:FN,clearIndexedDbPersistence:gN,collection:Ar,collectionGroup:lN,connectFirestoreEmulator:WT,count:hw,deleteAllPersistentCacheIndexes:IV,deleteDoc:fw,deleteField:cV,disableNetwork:IN,disablePersistentCacheIndexAutoCreation:yV,doc:fn,documentId:wN,enableIndexedDbPersistence:pN,enableMultiTabIndexedDbPersistence:mN,enableNetwork:yN,enablePersistentCacheIndexAutoCreation:_V,endAt:xN,endBefore:ON,ensureFirestoreConfigured:Ye,executeWrite:bo,getAggregateFromServer:mw,getCountFromServer:WN,getDoc:Ja,getDocFromCache:GN,getDocFromServer:KN,getDocs:Sn,getDocsFromCache:$N,getDocsFromServer:zN,getFirestore:JT,getPersistentCacheIndexManager:gV,increment:dV,initializeFirestore:fN,limit:cr,limitToLast:kN,loadBundle:EN,memoryEagerGarbageCollector:ZN,memoryLocalCache:tV,memoryLruGarbageCollector:eV,namedQuery:TN,onSnapshot:wp,onSnapshotsInSync:HN,or:CN,orderBy:Ep,persistentLocalCache:nV,persistentMultipleTabManager:sV,persistentSingleTabManager:gw,query:En,queryEqual:dp,refEqual:hN,runTransaction:aV,serverTimestamp:uV,setDoc:dw,setIndexConfiguration:mV,setLogLevel:eC,snapshotEqual:jN,startAfter:VN,startAt:NN,sum:MN,terminate:vN,updateDoc:wc,vector:fV,waitForPendingWrites:_N,where:Un,writeBatch:pV},Symbol.toStringTag,{value:"Module"}));var AV="firebase",bV="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */zn(AV,bV,"app");function Rp(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}/**
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
 */const RV={PHONE:"phone",TOTP:"totp"},SV={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"},PV={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"},CV={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"},DV={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kV(){return{"admin-restricted-operation":"This operation is restricted to administrators only.","argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","captcha-check-failed":"The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.","code-expired":"The SMS code has expired. Please re-send the verification code to try again.","cordova-not-ready":"Cordova framework is not ready.","cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-change-needs-verification":"Multi-factor users must always have a verified email.","email-already-in-use":"The email address is already in use by another account.","emulator-config-failed":'Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling "connectAuthEmulator()" sooner.',"expired-action-code":"The action code has expired.","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal AuthError has occurred.","invalid-app-credential":"The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.","invalid-app-id":"The mobile app identifier is not registered for the current project.","invalid-user-token":"This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.","invalid-auth-event":"An internal AuthError has occurred.","invalid-verification-code":"The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user.","invalid-continue-uri":"The continue URL provided in the request is invalid.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.","invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-dynamic-link-domain":"The provided dynamic link domain is not configured or authorized for the current project.","invalid-email":"The email address is badly formatted.","invalid-emulator-scheme":"Emulator URL must start with a valid scheme (http:// or https://).","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-cert-hash":"The SHA-1 certificate hash provided is invalid.","invalid-credential":"The supplied auth credential is incorrect, malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-multi-factor-session":"The request does not contain a valid proof of first factor successful sign-in.","invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","invalid-oauth-client-id":"The OAuth client ID provided is either invalid or does not match the specified API key.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.","invalid-persistence-type":"The specified persistence type is invalid. It can only be local, session or none.","invalid-phone-number":"The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].","invalid-provider-id":"The specified provider ID is invalid.","invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","invalid-verification-id":"The verification ID used to create the phone auth credential is invalid.","invalid-tenant-id":"The Auth instance's tenant ID is invalid.","login-blocked":"Login blocked by user-provided method: {$originalMessage}","missing-android-pkg-name":"An Android Package Name must be provided if the Android App is required to be installed.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.","missing-app-credential":"The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.","missing-verification-code":"The phone auth credential was created with an empty SMS verification code.","missing-continue-uri":"A continue URL must be provided in the request.","missing-iframe-start":"An internal AuthError has occurred.","missing-ios-bundle-id":"An iOS Bundle ID must be provided if an App Store ID is provided.","missing-or-invalid-nonce":"The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.","missing-password":"A non-empty password must be provided","missing-multi-factor-info":"No second factor identifier is provided.","missing-multi-factor-session":"The request is missing proof of first factor successful sign-in.","missing-phone-number":"To send verification codes, provide a phone number for the recipient.","missing-verification-id":"The phone auth credential was created with an empty verification ID.","app-deleted":"This instance of FirebaseApp has been deleted.","multi-factor-info-not-found":"The user does not have a second factor matching the identifier provided.","multi-factor-auth-required":"Proof of ownership of a second factor is required to complete sign-in.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal AuthError has occurred.","no-such-provider":"User was not linked to an account with the given provider.","null-user":"A null user object was provided as the argument for an operation which requires a non-null user object.","operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.","provider-already-linked":"User can only be linked to one identity for the given provider.","quota-exceeded":"The project's quota for this operation has been exceeded.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.","rejected-credential":"The request contains malformed or mismatching credentials.","second-factor-already-in-use":"The second factor is already enrolled on this account.","maximum-second-factor-count-exceeded":"The maximum allowed number of second factors on a user has been exceeded.","tenant-id-mismatch":"The provided tenant ID does not match the Auth instance's tenant ID",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.","unauthorized-continue-uri":"The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.","unsupported-first-factor":"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.","unsupported-persistence-type":"The current environment does not support the specified persistence type.","unsupported-tenant-operation":"This operation is not supported in a multi-tenant context.","unverified-email":"The operation requires a verified email.","user-cancelled":"The user did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled.","already-initialized":"initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.","missing-recaptcha-token":"The reCAPTCHA token is missing when sending request to the backend.","invalid-recaptcha-token":"The reCAPTCHA token is invalid when sending request to the backend.","invalid-recaptcha-action":"The reCAPTCHA action is invalid when sending request to the backend.","recaptcha-not-enabled":"reCAPTCHA Enterprise integration is not enabled for this project.","missing-client-type":"The reCAPTCHA client type is missing when sending request to the backend.","missing-recaptcha-version":"The reCAPTCHA version is missing when sending request to the backend.","invalid-req-type":"Invalid request parameters.","invalid-recaptcha-version":"The reCAPTCHA version is invalid when sending request to the backend.","unsupported-password-policy-schema-version":"The password policy received from the backend uses a schema version that is not supported by this version of the Firebase SDK.","password-does-not-meet-requirements":"The password does not meet the requirements."}}function Ew(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const NV=kV,Tw=Ew,ww=new ac("auth","Firebase",Ew()),VV={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_LOGIN_CREDENTIALS:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized",RECAPTCHA_NOT_ENABLED:"auth/recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"auth/missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"auth/invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"auth/invalid-recaptcha-action",MISSING_CLIENT_TYPE:"auth/missing-client-type",MISSING_RECAPTCHA_VERSION:"auth/missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"auth/invalid-recaptcha-version",INVALID_REQ_TYPE:"auth/invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu=new Ef("@firebase/auth");function OV(n,...e){Hu.logLevel<=we.WARN&&Hu.warn(`Auth (${ls}): ${n}`,...e)}function yu(n,...e){Hu.logLevel<=we.ERROR&&Hu.error(`Auth (${ls}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nn(n,...e){throw Pp(n,...e)}function Yt(n,...e){return Pp(n,...e)}function Sp(n,e,t){const r=Object.assign(Object.assign({},Tw()),{[e]:t});return new ac("auth","Firebase",r).create(e,{appName:n.name})}function bt(n){return Sp(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ro(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&nn(n,"argument-error"),Sp(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Pp(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return ww.create(n,...e)}function W(n,e,...t){if(!n)throw Pp(e,...t)}function Gn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw yu(e),new Error(e)}function br(n,e){n||Gn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Cp(){return cy()==="http:"||cy()==="https:"}function cy(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xV(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Cp()||xP()||"connection"in navigator)?navigator.onLine:!0}function LV(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(e,t){this.shortDelay=e,this.longDelay=t,br(t>e,"Short delay should be less than long delay!"),this.isMobile=NP()||LP()}get(){return xV()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(n,e){br(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aw{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Gn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Gn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Gn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MV={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FV=new Ac(3e4,6e4);function ze(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function He(n,e,t,r,i={}){return bw(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=ho(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l=Object.assign({method:e,headers:c},s);return OP()||(l.referrerPolicy="no-referrer"),Aw.fetch()(Rw(n,n.config.apiHost,t,a),l)})}async function bw(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},MV),e);try{const i=new BV(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw la(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw la(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw la(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw la(n,"user-disabled",o);const h=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Sp(n,h,l);nn(n,h)}}catch(i){if(i instanceof Yn)throw i;nn(n,"network-request-failed",{message:String(i)})}}async function Nr(n,e,t,r,i={}){const s=await He(n,e,t,r,i);return"mfaPendingCredential"in s&&nn(n,"multi-factor-auth-required",{_serverResponse:s}),s}function Rw(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?Dp(n.config,i):`${n.config.apiScheme}://${i}`}function UV(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class BV{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Yt(this.auth,"network-request-failed")),FV.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function la(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Yt(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uy(n){return n!==void 0&&n.getResponse!==void 0}function ly(n){return n!==void 0&&n.enterprise!==void 0}class Sw{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return UV(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qV(n){return(await He(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Pw(n,e){return He(n,"GET","/v2/recaptchaConfig",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jV(n,e){return He(n,"POST","/v1/accounts:delete",e)}async function GV(n,e){return He(n,"POST","/v1/accounts:update",e)}async function Cw(n,e){return He(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function KV(n,e=!1){return oe(n).getIdToken(e)}async function Dw(n,e=!1){const t=oe(n),r=await t.getIdToken(e),i=jl(r);W(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:ba(jh(i.auth_time)),issuedAtTime:ba(jh(i.iat)),expirationTime:ba(jh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function jh(n){return Number(n)*1e3}function jl(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return yu("JWT malformed, contained fewer than 3 sections"),null;try{const i=kv(t);return i?JSON.parse(i):(yu("Failed to decode base64 JWT payload"),null)}catch(i){return yu("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function hy(n){const e=jl(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Yn&&$V(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function $V({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zV{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ba(this.lastLoginAt),this.creationTime=ba(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Xa(n){var e;const t=n.auth,r=await n.getIdToken(),i=await Rr(n,Cw(t,{idToken:r}));W(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Nw(s.providerUserInfo):[],a=HV(n.providerData,o),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Kd(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function kw(n){const e=oe(n);await Xa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function HV(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Nw(n){return n.map(e=>{var{providerId:t}=e,r=Rp(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WV(n,e){const t=await bw(n,{},async()=>{const r=ho({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=Rw(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Aw.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function QV(n,e){return He(n,"POST","/v2/accounts:revokeToken",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):hy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=hy(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await WV(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new qs;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(W(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(W(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qs,this.toJSON())}_performRefresh(){return Gn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jr(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class fr{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Rp(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new zV(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Kd(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Rr(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Dw(this,e)}reload(){return kw(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new fr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Xa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ht(this.auth.app))return Promise.reject(bt(this.auth));const e=await this.getIdToken();return await Rr(this,jV(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,c,l,h;const f=(r=t.displayName)!==null&&r!==void 0?r:void 0,m=(i=t.email)!==null&&i!==void 0?i:void 0,g=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,b=(o=t.photoURL)!==null&&o!==void 0?o:void 0,R=(a=t.tenantId)!==null&&a!==void 0?a:void 0,C=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,V=(l=t.createdAt)!==null&&l!==void 0?l:void 0,D=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:x,emailVerified:M,isAnonymous:H,providerData:j,stsTokenManager:E}=t;W(x&&E,e,"internal-error");const _=qs.fromJSON(this.name,E);W(typeof x=="string",e,"internal-error"),jr(f,e.name),jr(m,e.name),W(typeof M=="boolean",e,"internal-error"),W(typeof H=="boolean",e,"internal-error"),jr(g,e.name),jr(b,e.name),jr(R,e.name),jr(C,e.name),jr(V,e.name),jr(D,e.name);const y=new fr({uid:x,auth:e,email:m,emailVerified:M,displayName:f,isAnonymous:H,photoURL:b,phoneNumber:g,tenantId:R,stsTokenManager:_,createdAt:V,lastLoginAt:D});return j&&Array.isArray(j)&&(y.providerData=j.map(v=>Object.assign({},v))),C&&(y._redirectEventId=C),y}static async _fromIdTokenResponse(e,t,r=!1){const i=new qs;i.updateFromServerResponse(t);const s=new fr({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Xa(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];W(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Nw(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new qs;a.updateFromIdToken(r);const c=new fr({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Kd(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dy=new Map;function pr(n){br(n instanceof Function,"Expected a class definition");let e=dy.get(n);return e?(br(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,dy.set(n,e),e)}/**
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
 */class Vw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Vw.type="NONE";const $d=Vw;/**
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
 */function Iu(n,e,t){return`firebase:${n}:${e}:${t}`}class js{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Iu(this.userKey,i.apiKey,s),this.fullPersistenceKey=Iu("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?fr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new js(pr($d),e,r);const i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||pr($d);const o=Iu(r,e.config.apiKey,e.name);let a=null;for(const l of t)try{const h=await l._get(o);if(h){const f=fr._fromJSON(e,h);l!==s&&(a=f),s=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new js(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new js(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fy(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Mw(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ow(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Uw(e))return"Blackberry";if(Bw(e))return"Webos";if(xw(e))return"Safari";if((e.includes("chrome/")||Lw(e))&&!e.includes("edge/"))return"Chrome";if(Fw(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ow(n=vt()){return/firefox\//i.test(n)}function xw(n=vt()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Lw(n=vt()){return/crios\//i.test(n)}function Mw(n=vt()){return/iemobile/i.test(n)}function Fw(n=vt()){return/android/i.test(n)}function Uw(n=vt()){return/blackberry/i.test(n)}function Bw(n=vt()){return/webos/i.test(n)}function kp(n=vt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function JV(n=vt()){var e;return kp(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function YV(){return MP()&&document.documentMode===10}function qw(n=vt()){return kp(n)||Fw(n)||Bw(n)||Uw(n)||/windows phone/i.test(n)||Mw(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jw(n,e=[]){let t;switch(n){case"Browser":t=fy(vt());break;case"Worker":t=`${fy(vt())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ls}/${r}`}/**
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
 */class XV{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function ZV(n,e={}){return He(n,"GET","/v2/passwordPolicy",ze(n,e))}/**
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
 */const eO=6;class tO{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:eO,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,a;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nO{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new py(this),this.idTokenSubscription=new py(this),this.beforeStateQueue=new XV(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ww,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=pr(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await js.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Cw(this,{idToken:e}),r=await fr._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(ht(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Xa(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=LV()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ht(this.app))return Promise.reject(bt(this));const t=e?oe(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ht(this.app)?Promise.reject(bt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ht(this.app)?Promise.reject(bt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(pr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ZV(this),t=new tO(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ac("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await QV(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&pr(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await js.create(this,[pr(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=jw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&OV(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function at(n){return oe(n)}class py{constructor(e){this.auth=e,this.observer=null,this.addObserver=GP(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function rO(n){bc=n}function Np(n){return bc.loadJS(n)}function iO(){return bc.recaptchaV2Script}function sO(){return bc.recaptchaEnterpriseScript}function oO(){return bc.gapiScript}function Gw(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const aO="recaptcha-enterprise",cO="NO_RECAPTCHA";class Kw{constructor(e){this.type=aO,this.auth=at(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{Pw(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new Sw(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){const c=window.grecaptcha;ly(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(cO)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&ly(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=sO();c.length!==0&&(c+=a),Np(c).then(()=>{i(a,s,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function my(n,e,t,r=!1){const i=new Kw(n);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function Za(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await my(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await my(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}async function uO(n){const e=at(n),t=await Pw(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Sw(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")&&new Kw(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $w(n,e){const t=fo(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(oi(s,e??{}))return i;nn(i,"already-initialized")}return t.initialize({options:e})}function lO(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(pr);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function zw(n,e,t){const r=at(n);W(r._canInitEmulator,r,"emulator-config-failed"),W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!!(t!=null&&t.disableWarnings),s=Hw(e),{host:o,port:a}=hO(e),c=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||dO()}function Hw(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function hO(n){const e=Hw(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:gy(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:gy(o)}}}function gy(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function dO(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Gn("not implemented")}_getIdTokenResponse(e){return Gn("not implemented")}_linkToIdToken(e,t){return Gn("not implemented")}_getReauthenticationResolver(e){return Gn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ww(n,e){return He(n,"POST","/v1/accounts:resetPassword",ze(n,e))}async function fO(n,e){return He(n,"POST","/v1/accounts:update",e)}async function pO(n,e){return He(n,"POST","/v1/accounts:signUp",e)}async function mO(n,e){return He(n,"POST","/v1/accounts:update",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gO(n,e){return Nr(n,"POST","/v1/accounts:signInWithPassword",ze(n,e))}async function Gl(n,e){return He(n,"POST","/v1/accounts:sendOobCode",ze(n,e))}async function _O(n,e){return Gl(n,e)}async function yO(n,e){return Gl(n,e)}async function IO(n,e){return Gl(n,e)}async function vO(n,e){return Gl(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EO(n,e){return Nr(n,"POST","/v1/accounts:signInWithEmailLink",ze(n,e))}async function TO(n,e){return Nr(n,"POST","/v1/accounts:signInWithEmailLink",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao extends So{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new ao(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ao(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(e,t,"signInWithPassword",gO);case"emailLink":return EO(e,{email:this._email,oobCode:this._password});default:nn(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Za(e,r,"signUpPassword",pO);case"emailLink":return TO(e,{idToken:t,email:this._email,oobCode:this._password});default:nn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const wO="http://localhost";class Jn extends So{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Jn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):nn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Rp(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Jn(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return _r(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,_r(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,_r(e,t)}buildRequest(){const e={requestUri:wO,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ho(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AO(n,e){return He(n,"POST","/v1/accounts:sendVerificationCode",ze(n,e))}async function bO(n,e){return Nr(n,"POST","/v1/accounts:signInWithPhoneNumber",ze(n,e))}async function RO(n,e){const t=await Nr(n,"POST","/v1/accounts:signInWithPhoneNumber",ze(n,e));if(t.temporaryProof)throw la(n,"account-exists-with-different-credential",t);return t}const SO={USER_NOT_FOUND:"user-not-found"};async function PO(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Nr(n,"POST","/v1/accounts:signInWithPhoneNumber",ze(n,t),SO)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni extends So{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new ni({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new ni({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return bO(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return RO(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return PO(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new ni({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CO(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function DO(n){const e=ia(sa(n)).link,t=e?ia(sa(e)).deep_link_id:null,r=ia(sa(n)).deep_link_id;return(r?ia(sa(r)).link:null)||r||t||e||n}class Po{constructor(e){var t,r,i,s,o,a;const c=ia(sa(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,h=(r=c.oobCode)!==null&&r!==void 0?r:null,f=CO((i=c.mode)!==null&&i!==void 0?i:null);W(l&&h&&f,"argument-error"),this.apiKey=l,this.operation=f,this.code=h,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=DO(e);try{return new Po(t)}catch{return null}}}function kO(n){return Po.parseLink(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(){this.providerId=bi.PROVIDER_ID}static credential(e,t){return ao._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=Po.parseLink(t);return W(r,"argument-error"),ao._fromEmailAndCode(e,r.code,r.tenantId)}}bi.PROVIDER_ID="password";bi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";bi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Co extends Vr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Ra extends Co{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return W("providerId"in t&&"signInMethod"in t,"argument-error"),Jn._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return W(e.idToken||e.accessToken,"argument-error"),Jn._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Ra.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Ra.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r,oauthTokenSecret:i,pendingToken:s,nonce:o,providerId:a}=e;if(!r&&!i&&!t&&!s||!a)return null;try{return new Ra(a)._credential({idToken:t,accessToken:r,nonce:o,pendingToken:s})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur extends Co{constructor(){super("facebook.com")}static credential(e){return Jn._fromParams({providerId:ur.PROVIDER_ID,signInMethod:ur.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ur.credentialFromTaggedObject(e)}static credentialFromError(e){return ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ur.credential(e.oauthAccessToken)}catch{return null}}}ur.FACEBOOK_SIGN_IN_METHOD="facebook.com";ur.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends Co{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Jn._fromParams({providerId:Bn.PROVIDER_ID,signInMethod:Bn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Bn.credentialFromTaggedObject(e)}static credentialFromError(e){return Bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return Bn.credential(t,r)}catch{return null}}}Bn.GOOGLE_SIGN_IN_METHOD="google.com";Bn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr extends Co{constructor(){super("github.com")}static credential(e){return Jn._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lr.credential(e.oauthAccessToken)}catch{return null}}}lr.GITHUB_SIGN_IN_METHOD="github.com";lr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NO="http://localhost";class ec extends So{constructor(e,t){super(e,e),this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return _r(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,_r(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,_r(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,pendingToken:s}=t;return!r||!i||!s||r!==i?null:new ec(r,s)}static _create(e,t){return new ec(e,t)}buildRequest(){return{requestUri:NO,returnSecureToken:!0,pendingToken:this.pendingToken}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VO="saml.";class Wu extends Vr{constructor(e){W(e.startsWith(VO),"argument-error"),super(e)}static credentialFromResult(e){return Wu.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return Wu.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=ec.fromJSON(e);return W(t,"argument-error"),t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{pendingToken:t,providerId:r}=e;if(!t||!r)return null;try{return ec._create(r,t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr extends Co{constructor(){super("twitter.com")}static credential(e,t){return Jn._fromParams({providerId:hr.PROVIDER_ID,signInMethod:hr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return hr.credentialFromTaggedObject(e)}static credentialFromError(e){return hr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return hr.credential(t,r)}catch{return null}}}hr.TWITTER_SIGN_IN_METHOD="twitter.com";hr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qw(n,e){return Nr(n,"POST","/v1/accounts:signUp",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await fr._fromIdTokenResponse(e,r,i),o=_y(r);return new An({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=_y(r);return new An({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function _y(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function OO(n){var e;if(ht(n.app))return Promise.reject(bt(n));const t=at(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new An({user:t.currentUser,providerId:null,operationType:"signIn"});const r=await Qw(t,{returnSecureToken:!0}),i=await An._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu extends Yn{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Qu.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Qu(e,t,r,i)}}function Jw(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Qu._fromErrorAndOperation(n,s,e,r):s})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yw(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function xO(n,e){const t=oe(n);await Kl(!0,t,e);const{providerUserInfo:r}=await GV(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),i=Yw(r||[]);return t.providerData=t.providerData.filter(s=>i.has(s.providerId)),i.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Vp(n,e,t=!1){const r=await Rr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return An._forOperation(n,"link",r)}async function Kl(n,e,t){await Xa(e);const r=Yw(e.providerData),i=n===!1?"provider-already-linked":"no-such-provider";W(r.has(t)===n,e.auth,i)}/**
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
 */async function Xw(n,e,t=!1){const{auth:r}=n;if(ht(r.app))return Promise.reject(bt(r));const i="reauthenticate";try{const s=await Rr(n,Jw(r,i,e,n),t);W(s.idToken,r,"internal-error");const o=jl(s.idToken);W(o,r,"internal-error");const{sub:a}=o;return W(n.uid===a,r,"user-mismatch"),An._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&nn(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zw(n,e,t=!1){if(ht(n.app))return Promise.reject(bt(n));const r="signIn",i=await Jw(n,r,e),s=await An._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function $l(n,e){return Zw(at(n),e)}async function eA(n,e){const t=oe(n);return await Kl(!1,t,e.providerId),Vp(t,e)}async function tA(n,e){return Xw(oe(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LO(n,e){return Nr(n,"POST","/v1/accounts:signInWithCustomToken",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MO(n,e){if(ht(n.app))return Promise.reject(bt(n));const t=at(n),r=await LO(t,{token:e,returnSecureToken:!0}),i=await An._fromIdTokenResponse(t,"signIn",r);return await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(e,t){this.factorId=e,this.uid=t.mfaEnrollmentId,this.enrollmentTime=new Date(t.enrolledAt).toUTCString(),this.displayName=t.displayName}static _fromServerResponse(e,t){return"phoneInfo"in t?Op._fromServerResponse(e,t):"totpInfo"in t?xp._fromServerResponse(e,t):nn(e,"internal-error")}}class Op extends Rc{constructor(e){super("phone",e),this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new Op(t)}}class xp extends Rc{constructor(e){super("totp",e)}static _fromServerResponse(e,t){return new xp(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */async function Lp(n){const e=at(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function FO(n,e,t){const r=at(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&zl(r,i,t),await Za(r,i,"getOobCode",yO)}async function UO(n,e,t){await Ww(oe(n),{oobCode:e,newPassword:t}).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Lp(n),r})}async function BO(n,e){await mO(oe(n),{oobCode:e})}async function nA(n,e){const t=oe(n),r=await Ww(t,{oobCode:e}),i=r.requestType;switch(W(i,t,"internal-error"),i){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":W(r.newEmail,t,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":W(r.mfaInfo,t,"internal-error");default:W(r.email,t,"internal-error")}let s=null;return r.mfaInfo&&(s=Rc._fromServerResponse(at(t),r.mfaInfo)),{data:{email:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.newEmail:r.email)||null,previousEmail:(r.requestType==="VERIFY_AND_CHANGE_EMAIL"?r.email:r.newEmail)||null,multiFactorInfo:s},operation:i}}async function qO(n,e){const{data:t}=await nA(oe(n),e);return t.email}async function rA(n,e,t){if(ht(n.app))return Promise.reject(bt(n));const r=at(n),o=await Za(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Qw).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Lp(n),c}),a=await An._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(a.user),a}function ha(n,e,t){return ht(n.app)?Promise.reject(bt(n)):$l(oe(n),bi.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Lp(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jO(n,e,t){const r=at(n),i={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function s(o,a){W(a.handleCodeInApp,r,"argument-error"),a&&zl(r,o,a)}s(i,t),await Za(r,i,"getOobCode",IO)}function GO(n,e){const t=Po.parseLink(e);return(t==null?void 0:t.operation)==="EMAIL_SIGNIN"}async function KO(n,e,t){if(ht(n.app))return Promise.reject(bt(n));const r=oe(n),i=bi.credentialWithLink(e,t||Ya());return W(i._tenantId===(r.tenantId||null),r,"tenant-id-mismatch"),$l(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $O(n,e){return He(n,"POST","/v1/accounts:createAuthUri",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zO(n,e){const t=Cp()?Ya():"http://localhost",r={identifier:e,continueUri:t},{signinMethods:i}=await $O(oe(n),r);return i||[]}async function HO(n,e){const t=oe(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&zl(t.auth,i,e);const{email:s}=await _O(t.auth,i);s!==n.email&&await n.reload()}async function WO(n,e,t){const r=oe(n),s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&zl(r.auth,s,t);const{email:o}=await vO(r.auth,s);o!==n.email&&await n.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function QO(n,e){return He(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JO(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=oe(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await Rr(r,QO(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:c})=>c==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function YO(n,e){const t=oe(n);return ht(t.auth.app)?Promise.reject(bt(t.auth)):iA(t,e,null)}function XO(n,e){return iA(oe(n),null,e)}async function iA(n,e,t){const{auth:r}=n,s={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(s.email=e),t&&(s.password=t);const o=await Rr(n,fO(r,s));await n._updateTokensIfNecessary(o,!0)}/**
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
 */function ZO(n){var e,t;if(!n)return null;const{providerId:r}=n,i=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},s=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!r&&(n!=null&&n.idToken)){const o=(t=(e=jl(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(o){const a=o!=="anonymous"&&o!=="custom"?o:null;return new Gs(s,a)}}if(!r)return null;switch(r){case"facebook.com":return new ex(s,i);case"github.com":return new tx(s,i);case"google.com":return new nx(s,i);case"twitter.com":return new rx(s,i,n.screenName||null);case"custom":case"anonymous":return new Gs(s,null);default:return new Gs(s,r,i)}}class Gs{constructor(e,t,r={}){this.isNewUser=e,this.providerId=t,this.profile=r}}class sA extends Gs{constructor(e,t,r,i){super(e,t,r),this.username=i}}class ex extends Gs{constructor(e,t){super(e,"facebook.com",t)}}class tx extends sA{constructor(e,t){super(e,"github.com",t,typeof(t==null?void 0:t.login)=="string"?t==null?void 0:t.login:null)}}class nx extends Gs{constructor(e,t){super(e,"google.com",t)}}class rx extends sA{constructor(e,t,r){super(e,"twitter.com",t,r)}}function ix(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:ZO(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ju(n,e){return oe(n).setPersistence(e)}function sx(n){return uO(n)}async function ox(n,e){return at(n).validatePassword(e)}function oA(n,e,t,r){return oe(n).onIdTokenChanged(e,t,r)}function aA(n,e,t){return oe(n).beforeAuthStateChanged(e,t)}function cA(n,e,t,r){return oe(n).onAuthStateChanged(e,t,r)}function ax(n){oe(n).useDeviceLanguage()}function cx(n,e){return oe(n).updateCurrentUser(e)}function Mp(n){return oe(n).signOut()}function ux(n,e){return at(n).revokeAccessToken(e)}async function lx(n){return oe(n).delete()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Fp{constructor(e,t,r){this.session=e,this.hints=t,this.signInResolver=r}static _fromError(e,t){const r=at(e),i=t.customData._serverResponse,s=(i.mfaInfo||[]).map(a=>Rc._fromServerResponse(r,a));W(i.mfaPendingCredential,r,"internal-error");const o=Ki._fromMfaPendingCredential(i.mfaPendingCredential);return new Fp(o,s,async a=>{const c=await a._process(r,o);delete i.mfaInfo,delete i.mfaPendingCredential;const l=Object.assign(Object.assign({},i),{idToken:c.idToken,refreshToken:c.refreshToken});switch(t.operationType){case"signIn":const h=await An._fromIdTokenResponse(r,t.operationType,l);return await r._updateCurrentUser(h.user),h;case"reauthenticate":return W(t.user,r,"internal-error"),An._forOperation(t.user,t.operationType,l);default:nn(r,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function hx(n,e){var t;const r=oe(n),i=e;return W(e.customData.operationType,r,"argument-error"),W((t=i.customData._serverResponse)===null||t===void 0?void 0:t.mfaPendingCredential,r,"argument-error"),Fp._fromError(r,i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:start",ze(n,e))}function fx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:finalize",ze(n,e))}function px(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:start",ze(n,e))}function mx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:finalize",ze(n,e))}function gx(n,e){return He(n,"POST","/v2/accounts/mfaEnrollment:withdraw",ze(n,e))}class Up{constructor(e){this.user=e,this.enrolledFactors=[],e._onReload(t=>{t.mfaInfo&&(this.enrolledFactors=t.mfaInfo.map(r=>Rc._fromServerResponse(e.auth,r)))})}static _fromUser(e){return new Up(e)}async getSession(){return Ki._fromIdtoken(await this.user.getIdToken(),this.user)}async enroll(e,t){const r=e,i=await this.getSession(),s=await Rr(this.user,r._process(this.user.auth,i,t));return await this.user._updateTokensIfNecessary(s),this.user.reload()}async unenroll(e){const t=typeof e=="string"?e:e.uid,r=await this.user.getIdToken();try{const i=await Rr(this.user,gx(this.user.auth,{idToken:r,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:s})=>s!==t),await this.user._updateTokensIfNecessary(i),await this.user.reload()}catch(i){throw i}}}const Gh=new WeakMap;function _x(n){const e=oe(n);return Gh.has(e)||Gh.set(e,Up._fromUser(e)),Gh.get(e)}const Yu="__sak";/**
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
 */class uA{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Yu,"1"),this.storage.removeItem(Yu),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yx=1e3,Ix=10;class lA extends uA{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=qw(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);YV()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ix):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},yx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}lA.type="LOCAL";const Hl=lA;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hA extends uA{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}hA.type="SESSION";const Wl=hA;/**
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
 */function vx(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ql{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Ql(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async l=>l(t.origin,s)),c=await vx(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ql.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Ex{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{const l=Jl("",20);i.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(f){const m=f;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(m.data.response);break;default:clearTimeout(h),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(){return window}function Tx(n){mt().location.href=n}/**
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
 */function Bp(){return typeof mt().WorkerGlobalScope<"u"&&typeof mt().importScripts=="function"}async function wx(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ax(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function bx(){return Bp()?self:null}/**
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
 */const dA="firebaseLocalStorageDb",Rx=1,Xu="firebaseLocalStorage",fA="fbase_key";class Sc{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Yl(n,e){return n.transaction([Xu],e?"readwrite":"readonly").objectStore(Xu)}function Sx(){const n=indexedDB.deleteDatabase(dA);return new Sc(n).toPromise()}function zd(){const n=indexedDB.open(dA,Rx);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Xu,{keyPath:fA})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Xu)?e(r):(r.close(),await Sx(),e(await zd()))})})}async function yy(n,e,t){const r=Yl(n,!0).put({[fA]:e,value:t});return new Sc(r).toPromise()}async function Px(n,e){const t=Yl(n,!1).get(e),r=await new Sc(t).toPromise();return r===void 0?null:r.value}function Iy(n,e){const t=Yl(n,!0).delete(e);return new Sc(t).toPromise()}const Cx=800,Dx=3;class pA{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await zd(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Dx)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Bp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ql._getInstance(bx()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await wx(),!this.activeServiceWorker)return;this.sender=new Ex(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ax()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await zd();return await yy(e,Yu,"1"),await Iy(e,Yu),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>yy(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Px(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Iy(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Yl(i,!1).getAll();return new Sc(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Cx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}pA.type="LOCAL";const qp=pA;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kx(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:start",ze(n,e))}function Nx(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:finalize",ze(n,e))}function Vx(n,e){return He(n,"POST","/v2/accounts/mfaSignIn:finalize",ze(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ox=500,xx=6e4,nu=1e12;class Lx{constructor(e){this.auth=e,this.counter=nu,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new Mx(e,this.auth.name,t||{})),this.counter++,r}reset(e){var t;const r=e||nu;(t=this._widgets.get(r))===null||t===void 0||t.delete(),this._widgets.delete(r)}getResponse(e){var t;const r=e||nu;return((t=this._widgets.get(r))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const r=e||nu;return(t=this._widgets.get(r))===null||t===void 0||t.execute(),""}}class Mx{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;W(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Fx(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},xx)},Ox))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Fx(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh=Gw("rcb"),Ux=new Ac(3e4,6e4);class Bx{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=mt().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return W(qx(t),e,"argument-error"),this.shouldResolveImmediately(t)&&uy(mt().grecaptcha)?Promise.resolve(mt().grecaptcha):new Promise((r,i)=>{const s=mt().setTimeout(()=>{i(Yt(e,"network-request-failed"))},Ux.get());mt()[Kh]=()=>{mt().clearTimeout(s),delete mt()[Kh];const a=mt().grecaptcha;if(!a||!uy(a)){i(Yt(e,"internal-error"));return}const c=a.render;a.render=(l,h)=>{const f=c(l,h);return this.counter++,f},this.hostLanguage=t,r(a)};const o=`${iO()}?${ho({onload:Kh,render:"explicit",hl:t})}`;Np(o).catch(()=>{clearTimeout(s),i(Yt(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=mt().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function qx(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class jx{async load(e){return new Lx(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mA="recaptcha",Gx={theme:"light",type:"image"};class Kx{constructor(e,t,r=Object.assign({},Gx)){this.parameters=r,this.type=mA,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=at(e),this.isInvisible=this.parameters.size==="invisible",W(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;W(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new jx:new Bx,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){W(!this.parameters.sitekey,this.auth,"argument-error"),W(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),W(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=mt()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){W(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){W(Cp()&&!Bp(),this.auth,"internal-error"),await $x(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await qV(this.auth);W(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return W(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function $x(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=ni._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function zx(n,e,t){if(ht(n.app))return Promise.reject(bt(n));const r=at(n),i=await Xl(r,e,oe(t));return new jp(i,s=>$l(r,s))}async function Hx(n,e,t){const r=oe(n);await Kl(!1,r,"phone");const i=await Xl(r.auth,e,oe(t));return new jp(i,s=>eA(r,s))}async function Wx(n,e,t){const r=oe(n);if(ht(r.auth.app))return Promise.reject(bt(r.auth));const i=await Xl(r.auth,e,oe(t));return new jp(i,s=>tA(r,s))}async function Xl(n,e,t){var r;const i=await t.verify();try{W(typeof i=="string",n,"argument-error"),W(t.type===mA,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const o=s.session;if("phoneNumber"in s)return W(o.type==="enroll",n,"internal-error"),(await dx(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{W(o.type==="signin",n,"internal-error");const a=((r=s.multiFactorHint)===null||r===void 0?void 0:r.uid)||s.multiFactorUid;return W(a,n,"missing-multi-factor-info"),(await kx(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{const{sessionInfo:o}=await AO(n,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}async function Qx(n,e){const t=oe(n);if(ht(t.auth.app))return Promise.reject(bt(t.auth));await Vp(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi{constructor(e){this.providerId=Yi.PROVIDER_ID,this.auth=at(e)}verifyPhoneNumber(e,t){return Xl(this.auth,e,oe(t))}static credential(e,t){return ni._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Yi.credentialFromTaggedObject(t)}static credentialFromError(e){return Yi.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:r}=e;return t&&r?ni._fromTokenResponse(t,r):null}}Yi.PROVIDER_ID="phone";Yi.PHONE_SIGN_IN_METHOD="phone";/**
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
 */class Gp extends So{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return _r(e,this._buildIdpRequest())}_linkToIdToken(e,t){return _r(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return _r(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Jx(n){return Zw(n.auth,new Gp(n),n.bypassAuthState)}function Yx(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Xw(t,new Gp(n),n.bypassAuthState)}async function Xx(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Vp(t,new Gp(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gA{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Jx;case"linkViaPopup":case"linkViaRedirect":return Xx;case"reauthViaPopup":case"reauthViaRedirect":return Yx;default:nn(this.auth,"internal-error")}}resolve(e){br(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){br(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zx=new Ac(2e3,1e4);async function Kp(n,e,t){if(ht(n.app))return Promise.reject(Yt(n,"operation-not-supported-in-this-environment"));const r=at(n);Ro(n,e,Vr);const i=ps(r,t);return new mr(r,"signInViaPopup",e,i).executeNotNull()}async function eL(n,e,t){const r=oe(n);if(ht(r.auth.app))return Promise.reject(Yt(r.auth,"operation-not-supported-in-this-environment"));Ro(r.auth,e,Vr);const i=ps(r.auth,t);return new mr(r.auth,"reauthViaPopup",e,i,r).executeNotNull()}async function tL(n,e,t){const r=oe(n);Ro(r.auth,e,Vr);const i=ps(r.auth,t);return new mr(r.auth,"linkViaPopup",e,i,r).executeNotNull()}class mr extends gA{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,mr.currentPopupAction&&mr.currentPopupAction.cancel(),mr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){br(this.filter.length===1,"Popup operations only handle one event");const e=Jl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,mr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Yt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Zx.get())};e()}}mr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nL="pendingRedirect",vu=new Map;class rL extends gA{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=vu.get(this.auth._key());if(!e){try{const r=await iL(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}vu.set(this.auth._key(),e)}return this.bypassAuthState||vu.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function iL(n,e){const t=yA(e),r=_A(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}async function $p(n,e){return _A(n)._set(yA(e),"true")}function sL(n,e){vu.set(n._key(),e)}function _A(n){return pr(n._redirectPersistence)}function yA(n){return Iu(nL,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oL(n,e,t){return aL(n,e,t)}async function aL(n,e,t){if(ht(n.app))return Promise.reject(bt(n));const r=at(n);Ro(n,e,Vr),await r._initializationPromise;const i=ps(r,t);return await $p(i,r),i._openRedirect(r,e,"signInViaRedirect")}function cL(n,e,t){return uL(n,e,t)}async function uL(n,e,t){const r=oe(n);if(Ro(r.auth,e,Vr),ht(r.auth.app))return Promise.reject(bt(r.auth));await r.auth._initializationPromise;const i=ps(r.auth,t);await $p(i,r.auth);const s=await vA(r);return i._openRedirect(r.auth,e,"reauthViaRedirect",s)}function lL(n,e,t){return hL(n,e,t)}async function hL(n,e,t){const r=oe(n);Ro(r.auth,e,Vr),await r.auth._initializationPromise;const i=ps(r.auth,t);await Kl(!1,r,e.providerId),await $p(i,r.auth);const s=await vA(r);return i._openRedirect(r.auth,e,"linkViaRedirect",s)}async function dL(n,e){return await at(n)._initializationPromise,IA(n,e,!1)}async function IA(n,e,t=!1){if(ht(n.app))return Promise.reject(bt(n));const r=at(n),i=ps(r,e),o=await new rL(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}async function vA(n){const e=Jl(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fL=600*1e3;class pL{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!mL(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!EA(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Yt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=fL&&this.cachedEventUids.clear(),this.cachedEventUids.has(vy(e))}saveEventToCache(e){this.cachedEventUids.add(vy(e)),this.lastProcessedEventTime=Date.now()}}function vy(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function EA({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function mL(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return EA(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gL(n,e={}){return He(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _L=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,yL=/^https?/;async function IL(n){if(n.config.emulator)return;const{authorizedDomains:e}=await gL(n);for(const t of e)try{if(vL(t))return}catch{}nn(n,"unauthorized-domain")}function vL(n){const e=Ya(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!yL.test(t))return!1;if(_L.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const EL=new Ac(3e4,6e4);function Ey(){const n=mt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function TL(n){return new Promise((e,t)=>{var r,i,s;function o(){Ey(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ey(),t(Yt(n,"network-request-failed"))},timeout:EL.get()})}if(!((i=(r=mt().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=mt().gapi)===null||s===void 0)&&s.load)o();else{const a=Gw("iframefcb");return mt()[a]=()=>{gapi.load?o():t(Yt(n,"network-request-failed"))},Np(`${oO()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw Eu=null,e})}let Eu=null;function wL(n){return Eu=Eu||TL(n),Eu}/**
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
 */const AL=new Ac(5e3,15e3),bL="__/auth/iframe",RL="emulator/auth/iframe",SL={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},PL=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function CL(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Dp(e,RL):`https://${n.config.authDomain}/${bL}`,r={apiKey:e.apiKey,appName:n.name,v:ls},i=PL.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${ho(r).slice(1)}`}async function DL(n){const e=await wL(n),t=mt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:CL(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:SL,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Yt(n,"network-request-failed"),a=mt().setTimeout(()=>{s(o)},AL.get());function c(){mt().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}/**
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
 */const kL={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},NL=500,VL=600,OL="_blank",xL="http://localhost";class Ty{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function LL(n,e,t,r=NL,i=VL){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const c=Object.assign(Object.assign({},kL),{width:r.toString(),height:i.toString(),top:s,left:o}),l=vt().toLowerCase();t&&(a=Lw(l)?OL:t),Ow(l)&&(e=e||xL,c.scrollbars="yes");const h=Object.entries(c).reduce((m,[g,b])=>`${m}${g}=${b},`,"");if(JV(l)&&a!=="_self")return ML(e||"",a),new Ty(null);const f=window.open(e||"",a,h);W(f,n,"popup-blocked");try{f.focus()}catch{}return new Ty(f)}function ML(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const FL="__/auth/handler",UL="emulator/auth/handler",BL=encodeURIComponent("fac");async function wy(n,e,t,r,i,s){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ls,eventId:i};if(e instanceof Vr){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",jP(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,f]of Object.entries({}))o[h]=f}if(e instanceof Co){const h=e.getScopes().filter(f=>f!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await n._getAppCheckToken(),l=c?`#${BL}=${encodeURIComponent(c)}`:"";return`${qL(n)}?${ho(a).slice(1)}${l}`}function qL({config:n}){return n.emulator?Dp(n,UL):`https://${n.authDomain}/${FL}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h="webStorageSupport";class jL{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Wl,this._completeRedirectFn=IA,this._overrideRedirectResult=sL}async _openPopup(e,t,r,i){var s;br((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await wy(e,t,r,Ya(),i);return LL(e,o,Jl())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await wy(e,t,r,Ya(),i);return Tx(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(br(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await DL(e),r=new pL(e);return t.register("authEvent",i=>(W(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send($h,{type:$h},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[$h];o!==void 0&&t(!!o),nn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=IL(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return qw()||xw()||kp()}}const TA=jL;class wA{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Gn("unexpected MultiFactorSessionType")}}}class zp extends wA{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new zp(e)}_finalizeEnroll(e,t,r){return fx(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Nx(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class AA{constructor(){}static assertion(e){return zp._fromCredential(e)}}AA.FACTOR_ID="phone";class bA{static assertionForEnrollment(e,t){return tc._fromSecret(e,t)}static assertionForSignIn(e,t){return tc._fromEnrollmentId(e,t)}static async generateSecret(e){var t;const r=e;W(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");const i=await px(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Zl._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}}bA.FACTOR_ID="totp";class tc extends wA{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new tc(t,void 0,e)}static _fromEnrollmentId(e,t){return new tc(t,e)}async _finalizeEnroll(e,t,r){return W(typeof this.secret<"u",e,"argument-error"),mx(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){W(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");const r={verificationCode:this.otp};return Vx(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}}class Zl{constructor(e,t,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new Zl(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(ru(e)||ru(t))&&(i=!0),i&&(ru(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),ru(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function ru(n){return typeof n>"u"||(n==null?void 0:n.length)===0}var Ay="@firebase/auth",by="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GL{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KL(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function $L(n){Zi(new ai("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:jw(n)},l=new nO(r,i,s,c);return lO(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Zi(new ai("auth-internal",e=>{const t=at(e.getProvider("auth").getImmediate());return(r=>new GL(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),zn(Ay,by,KL(n)),zn(Ay,by,"esm2017")}/**
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
 */const zL=300,HL=xv("authIdTokenMaxAge")||zL;let Ry=null;const WL=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>HL)return;const i=t==null?void 0:t.token;Ry!==i&&(Ry=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Zu(n=Il()){const e=fo(n,"auth");if(e.isInitialized())return e.getImmediate();const t=$w(n,{popupRedirectResolver:TA,persistence:[qp,Hl,Wl]}),r=xv("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=WL(s.toString());aA(t,o,()=>o(t.currentUser)),oA(t,a=>o(a))}}const i=Nv("auth");return i&&zw(t,`http://${i}`),t}function QL(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}rO({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Yt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",QL().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});$L("Browser");const JL=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeOperation:DV,ActionCodeURL:Po,AuthCredential:So,AuthErrorCodes:VV,EmailAuthCredential:ao,EmailAuthProvider:bi,FacebookAuthProvider:ur,FactorId:RV,GithubAuthProvider:lr,GoogleAuthProvider:Bn,OAuthCredential:Jn,OAuthProvider:Ra,OperationType:CV,PhoneAuthCredential:ni,PhoneAuthProvider:Yi,PhoneMultiFactorGenerator:AA,ProviderId:SV,RecaptchaVerifier:Kx,SAMLAuthProvider:Wu,SignInMethod:PV,TotpMultiFactorGenerator:bA,TotpSecret:Zl,TwitterAuthProvider:hr,applyActionCode:BO,beforeAuthStateChanged:aA,browserLocalPersistence:Hl,browserPopupRedirectResolver:TA,browserSessionPersistence:Wl,checkActionCode:nA,confirmPasswordReset:UO,connectAuthEmulator:zw,createUserWithEmailAndPassword:rA,debugErrorMap:NV,deleteUser:lx,fetchSignInMethodsForEmail:zO,getAdditionalUserInfo:ix,getAuth:Zu,getIdToken:KV,getIdTokenResult:Dw,getMultiFactorResolver:hx,getRedirectResult:dL,inMemoryPersistence:$d,indexedDBLocalPersistence:qp,initializeAuth:$w,initializeRecaptchaConfig:sx,isSignInWithEmailLink:GO,linkWithCredential:eA,linkWithPhoneNumber:Hx,linkWithPopup:tL,linkWithRedirect:lL,multiFactor:_x,onAuthStateChanged:cA,onIdTokenChanged:oA,parseActionCodeURL:kO,prodErrorMap:Tw,reauthenticateWithCredential:tA,reauthenticateWithPhoneNumber:Wx,reauthenticateWithPopup:eL,reauthenticateWithRedirect:cL,reload:kw,revokeAccessToken:ux,sendEmailVerification:HO,sendPasswordResetEmail:FO,sendSignInLinkToEmail:jO,setPersistence:Ju,signInAnonymously:OO,signInWithCredential:$l,signInWithCustomToken:MO,signInWithEmailAndPassword:ha,signInWithEmailLink:KO,signInWithPhoneNumber:zx,signInWithPopup:Kp,signInWithRedirect:oL,signOut:Mp,unlink:xO,updateCurrentUser:cx,updateEmail:YO,updatePassword:XO,updatePhoneNumber:Qx,updateProfile:JO,useDeviceLanguage:ax,validatePassword:ox,verifyBeforeUpdateEmail:WO,verifyPasswordResetCode:qO},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RA="firebasestorage.googleapis.com",SA="storageBucket",YL=120*1e3,XL=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends Yn{constructor(e,t,r=0){super(zh(e),`Firebase Storage: ${t} (${zh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,ct.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return zh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ot;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ot||(ot={}));function zh(n){return"storage/"+n}function Hp(){const n="An unknown error occurred, please check the error payload for server response.";return new ct(ot.UNKNOWN,n)}function ZL(n){return new ct(ot.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function eM(n){return new ct(ot.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function tM(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new ct(ot.UNAUTHENTICATED,n)}function nM(){return new ct(ot.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function rM(n){return new ct(ot.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function iM(){return new ct(ot.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function sM(){return new ct(ot.CANCELED,"User canceled the upload/download.")}function oM(n){return new ct(ot.INVALID_URL,"Invalid URL '"+n+"'.")}function aM(n){return new ct(ot.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function cM(){return new ct(ot.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+SA+"' property when initializing the app?")}function uM(){return new ct(ot.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function lM(){return new ct(ot.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function hM(n){return new ct(ot.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Hd(n){return new ct(ot.INVALID_ARGUMENT,n)}function PA(){return new ct(ot.APP_DELETED,"The Firebase app was deleted.")}function dM(n){return new ct(ot.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Sa(n,e){return new ct(ot.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Xo(n){throw new ct(ot.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=hn.makeFromUrl(e,t)}catch{return new hn(e,"")}if(r.path==="")return r;throw aM(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(M){M.path.charAt(M.path.length-1)==="/"&&(M.path_=M.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),c={bucket:1,path:3};function l(M){M.path_=decodeURIComponent(M.path)}const h="v[A-Za-z0-9_]+",f=t.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",g=new RegExp(`^https?://${f}/${h}/b/${i}/o${m}`,"i"),b={bucket:1,path:3},R=t===RA?"(?:storage.googleapis.com|storage.cloud.google.com)":t,C="([^?#]*)",V=new RegExp(`^https?://${R}/${i}/${C}`,"i"),x=[{regex:a,indices:c,postModify:s},{regex:g,indices:b,postModify:l},{regex:V,indices:{bucket:1,path:2},postModify:l}];for(let M=0;M<x.length;M++){const H=x[M],j=H.regex.exec(e);if(j){const E=j[H.indices.bucket];let _=j[H.indices.path];_||(_=""),r=new hn(E,_),H.postModify(r);break}}if(r==null)throw oM(e);return r}}class fM{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pM(n,e,t){let r=1,i=null,s=null,o=!1,a=0;function c(){return a===2}let l=!1;function h(...C){l||(l=!0,e.apply(null,C))}function f(C){i=setTimeout(()=>{i=null,n(g,c())},C)}function m(){s&&clearTimeout(s)}function g(C,...V){if(l){m();return}if(C){m(),h.call(null,C,...V);return}if(c()||o){m(),h.call(null,C,...V);return}r<64&&(r*=2);let x;a===1?(a=2,x=0):x=(r+Math.random())*1e3,f(x)}let b=!1;function R(C){b||(b=!0,m(),!l&&(i!==null?(C||(a=2),clearTimeout(i),f(0)):C||(a=1)))}return f(0),s=setTimeout(()=>{o=!0,R(!0)},t),R}function mM(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gM(n){return n!==void 0}function _M(n){return typeof n=="object"&&!Array.isArray(n)}function Wp(n){return typeof n=="string"||n instanceof String}function Sy(n){return Qp()&&n instanceof Blob}function Qp(){return typeof Blob<"u"}function Py(n,e,t,r){if(r<e)throw Hd(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw Hd(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eh(n,e,t){let r=e;return t==null&&(r=`https://${e}`),`${t}://${r}/v0${n}`}function CA(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var Xi;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Xi||(Xi={}));/**
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
 */function yM(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IM{constructor(e,t,r,i,s,o,a,c,l,h,f,m=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=c,this.timeout_=l,this.progressCallback_=h,this.connectionFactory_=f,this.retry=m,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((g,b)=>{this.resolve_=g,this.reject_=b,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new iu(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const c=a.loaded,l=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,l)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===Xi.NO_ERROR,c=s.getStatus();if(!a||yM(c,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===Xi.ABORT;r(!1,new iu(!1,null,h));return}const l=this.successCodes_.indexOf(c)!==-1;r(!0,new iu(l,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const c=this.callback_(a,a.getResponse());gM(c)?s(c):s()}catch(c){o(c)}else if(a!==null){const c=Hp();c.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,c)):o(c)}else if(i.canceled){const c=this.appDelete_?PA():sM();o(c)}else{const c=iM();o(c)}};this.canceled_?t(!1,new iu(!1,null,!0)):this.backoffId_=pM(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&mM(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class iu{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function vM(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function EM(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function TM(n,e){e&&(n["X-Firebase-GMPID"]=e)}function wM(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function AM(n,e,t,r,i,s,o=!0){const a=CA(n.urlParams),c=n.url+a,l=Object.assign({},n.headers);return TM(l,e),vM(l,t),EM(l,s),wM(l,r),new IM(c,n.method,l,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bM(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function RM(...n){const e=bM();if(e!==void 0){const t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Qp())return new Blob(n);throw new ct(ot.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function SM(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function PM(n){if(typeof atob>"u")throw hM("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Hh{constructor(e,t){this.data=e,this.contentType=t||null}}function CM(n,e){switch(n){case Kn.RAW:return new Hh(DA(e));case Kn.BASE64:case Kn.BASE64URL:return new Hh(kA(n,e));case Kn.DATA_URL:return new Hh(kM(e),NM(e))}throw Hp()}function DA(n){const e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=n.charCodeAt(++t);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function DM(n){let e;try{e=decodeURIComponent(n)}catch{throw Sa(Kn.DATA_URL,"Malformed data URL.")}return DA(e)}function kA(n,e){switch(n){case Kn.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Sa(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case Kn.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Sa(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=PM(e)}catch(i){throw i.message.includes("polyfill")?i:Sa(n,"Invalid character found")}const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}class NA{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Sa(Kn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=t[1]||null;r!=null&&(this.base64=VM(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function kM(n){const e=new NA(n);return e.base64?kA(Kn.BASE64,e.rest):DM(e.rest)}function NM(n){return new NA(n).contentType}function VM(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(e,t){let r=0,i="";Sy(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(Sy(this.data_)){const r=this.data_,i=SM(r,e,t);return i===null?null:new Yr(i)}else{const r=new Uint8Array(this.data_.buffer,e,t-e);return new Yr(r,!0)}}static getBlob(...e){if(Qp()){const t=e.map(r=>r instanceof Yr?r.data_:r);return new Yr(RM.apply(null,t))}else{const t=e.map(o=>Wp(o)?CM(Kn.RAW,o).data:o.data_);let r=0;t.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return t.forEach(o=>{for(let a=0;a<o.length;a++)i[s++]=o[a]}),new Yr(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VA(n){let e;try{e=JSON.parse(n)}catch{return null}return _M(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OM(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function xM(n,e){const t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function OA(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LM(n,e){return e}class $t{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||LM}}let su=null;function MM(n){return!Wp(n)||n.length<2?n:OA(n)}function xA(){if(su)return su;const n=[];n.push(new $t("bucket")),n.push(new $t("generation")),n.push(new $t("metageneration")),n.push(new $t("name","fullPath",!0));function e(s,o){return MM(o)}const t=new $t("name");t.xform=e,n.push(t);function r(s,o){return o!==void 0?Number(o):o}const i=new $t("size");return i.xform=r,n.push(i),n.push(new $t("timeCreated")),n.push(new $t("updated")),n.push(new $t("md5Hash",null,!0)),n.push(new $t("cacheControl",null,!0)),n.push(new $t("contentDisposition",null,!0)),n.push(new $t("contentEncoding",null,!0)),n.push(new $t("contentLanguage",null,!0)),n.push(new $t("contentType",null,!0)),n.push(new $t("metadata","customMetadata",!0)),su=n,su}function FM(n,e){function t(){const r=n.bucket,i=n.fullPath,s=new hn(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function UM(n,e,t){const r={};r.type="file";const i=t.length;for(let s=0;s<i;s++){const o=t[s];r[o.local]=o.xform(r,e[o.server])}return FM(r,n),r}function LA(n,e,t){const r=VA(e);return r===null?null:UM(n,r,t)}function BM(n,e,t,r){const i=VA(e);if(i===null||!Wp(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(l=>{const h=n.bucket,f=n.fullPath,m="/b/"+o(h)+"/o/"+o(f),g=eh(m,t,r),b=CA({alt:"media",token:l});return g+b})[0]}function qM(n,e){const t={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}class Jp{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MA(n){if(!n)throw Hp()}function jM(n,e){function t(r,i){const s=LA(n,i,e);return MA(s!==null),s}return t}function GM(n,e){function t(r,i){const s=LA(n,i,e);return MA(s!==null),BM(s,i,n.host,n._protocol)}return t}function FA(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=nM():i=tM():t.getStatus()===402?i=eM(n.bucket):t.getStatus()===403?i=rM(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function UA(n){const e=FA(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=ZL(n.path)),s.serverResponse=i.serverResponse,s}return t}function KM(n,e,t){const r=e.fullServerUrl(),i=eh(r,n.host,n._protocol),s="GET",o=n.maxOperationRetryTime,a=new Jp(i,s,GM(n,t),o);return a.errorHandler=UA(e),a}function $M(n,e){const t=e.fullServerUrl(),r=eh(t,n.host,n._protocol),i="DELETE",s=n.maxOperationRetryTime;function o(c,l){}const a=new Jp(r,i,o,s);return a.successCodes=[200,204],a.errorHandler=UA(e),a}function zM(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function HM(n,e,t){const r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=zM(null,e)),r}function WM(n,e,t,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let x="";for(let M=0;M<2;M++)x=x+Math.random().toString().slice(2);return x}const c=a();o["Content-Type"]="multipart/related; boundary="+c;const l=HM(e,r,i),h=qM(l,t),f="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+h+`\r
--`+c+`\r
Content-Type: `+l.contentType+`\r
\r
`,m=`\r
--`+c+"--",g=Yr.getBlob(f,r,m);if(g===null)throw uM();const b={name:l.fullPath},R=eh(s,n.host,n._protocol),C="POST",V=n.maxUploadRetryTime,D=new Jp(R,C,jM(n,t),V);return D.urlParams=b,D.headers=o,D.body=g.uploadData(),D.errorHandler=FA(e),D}class QM{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=Xi.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=Xi.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=Xi.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i){if(this.sent_)throw Xo("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),i!==void 0)for(const s in i)i.hasOwnProperty(s)&&this.xhr_.setRequestHeader(s,i[s].toString());return r!==void 0?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Xo("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Xo("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Xo("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Xo("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class JM extends QM{initXhr(){this.xhr_.responseType="text"}}function Yp(){return new JM}/**
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
 */class us{constructor(e,t){this._service=e,t instanceof hn?this._location=t:this._location=hn.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new us(e,t)}get root(){const e=new hn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return OA(this._location.path)}get storage(){return this._service}get parent(){const e=OM(this._location.path);if(e===null)return null;const t=new hn(this._location.bucket,e);return new us(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw dM(e)}}function YM(n,e,t){n._throwIfRoot("uploadBytes");const r=WM(n.storage,n._location,xA(),new Yr(e,!0),t);return n.storage.makeRequestWithTokens(r,Yp).then(i=>({metadata:i,ref:n}))}function XM(n){n._throwIfRoot("getDownloadURL");const e=KM(n.storage,n._location,xA());return n.storage.makeRequestWithTokens(e,Yp).then(t=>{if(t===null)throw lM();return t})}function ZM(n){n._throwIfRoot("deleteObject");const e=$M(n.storage,n._location);return n.storage.makeRequestWithTokens(e,Yp)}function eF(n,e){const t=xM(n._location.path,e),r=new hn(n._location.bucket,t);return new us(n.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tF(n){return/^[A-Za-z]+:\/\//.test(n)}function nF(n,e){return new us(n,e)}function BA(n,e){if(n instanceof Xp){const t=n;if(t._bucket==null)throw cM();const r=new us(t,t._bucket);return e!=null?BA(r,e):r}else return e!==void 0?eF(n,e):n}function rF(n,e){if(e&&tF(e)){if(n instanceof Xp)return nF(n,e);throw Hd("To use ref(service, url), the first argument must be a Storage instance.")}else return BA(n,e)}function Cy(n,e){const t=e==null?void 0:e[SA];return t==null?null:hn.makeFromBucketSpec(t,n)}function iF(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:Lv(i,n.app.options.projectId))}class Xp{constructor(e,t,r,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=RA,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=YL,this._maxUploadRetryTime=XL,this._requests=new Set,i!=null?this._bucket=hn.makeFromBucketSpec(i,this._host):this._bucket=Cy(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=hn.makeFromBucketSpec(this._url,e):this._bucket=Cy(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Py("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Py("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new us(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new fM(PA());{const o=AM(e,this._appId,r,i,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const Dy="@firebase/storage",ky="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qA="storage";function OU(n,e,t){return n=oe(n),YM(n,e,t)}function xU(n){return n=oe(n),XM(n)}function LU(n){return n=oe(n),ZM(n)}function MU(n,e){return n=oe(n),rF(n,e)}function sF(n=Il(),e){n=oe(n);const r=fo(n,qA).getImmediate({identifier:e}),i=Vv("storage");return i&&oF(r,...i),r}function oF(n,e,t,r={}){iF(n,e,t,r)}function aF(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Xp(t,r,i,e,ls)}function cF(){Zi(new ai(qA,aF,"PUBLIC").setMultipleInstances(!0)),zn(Dy,ky,""),zn(Dy,ky,"esm2017")}cF();const jA={apiKey:"AIzaSyBdZexExhs-vCnAOXRK6DSj4uUUTMGWlEE",authDomain:"portal-mambaul-ulum.firebaseapp.com",projectId:"portal-mambaul-ulum",storageBucket:"portal-mambaul-ulum.firebasestorage.app",messagingSenderId:"289365012301",appId:"1:289365012301:web:c5b2655559043783221104",measurementId:"G-59LNXJ9MVH"},th=wf(jA),gt=JT(th),cn=Zu(th),uF=sF(th);let Rs=null;function GA(){if(Rs)return Rs;try{const n=wf(jA,"_auth_provisioning");return Rs=Zu(n),Rs}catch{try{const e=Il("_auth_provisioning");return Rs=Zu(e),Rs}catch(e){return console.warn("[firebase] Secondary auth init fail:",e.message),null}}}const lF=Object.freeze(Object.defineProperty({__proto__:null,auth:cn,db:gt,firebaseApp:th,getSecondaryAuth:GA,storage:uF},Symbol.toStringTag,{value:"Module"}));async function Ny(n,e){const t=await Ja(fn(gt,n,e));return t.exists()?{id:t.id,...t.data()}:null}async function Ss(n,e=[],t=[],r=0){const i=[];for(const[a,c,l]of e)i.push(Un(a,c,l));for(const[a,c]of t)i.push(Ep(a,c));r>0&&i.push(cr(r));const s=En(Ar(gt,n),...i);return(await Sn(s)).docs.map(a=>({id:a.id,...a.data()}))}async function Vy(n,e,t){await dw(fn(gt,n,e),t)}async function FU(n,e,t){await wc(fn(gt,n,e),t)}async function UU(n,e){return(await pw(Ar(gt,n),e)).id}async function BU(n,e){await fw(fn(gt,n,e))}function qU(n,e,t=[],r=[]){const i=[];for(const[o,a,c]of t)i.push(Un(o,a,c));for(const[o,a]of r)i.push(Ep(o,a));const s=i.length?En(Ar(gt,n),...i):Ar(gt,n);return wp(s,o=>{const a=o.docs.map(c=>({id:c.id,...c.data()}));e(a)},o=>{console.error(`[subscribeColl] ${n} error:`,o)})}function Oy(n,e,t){return wp(fn(gt,n,e),r=>{t(r.exists()?{id:r.id,...r.data()}:null)},r=>{console.error(`[subscribeDoc] ${n}/${e} error:`,r)})}const Wh="web",Qh="general",Jh={txtAppName:"Ammu Online",txtHeaderBar:"Ammu Online",appTitle:"Ammu Online — Pondok Pesantren Mambaul Ulum",kopLine1:"PONDOK PESANTREN MAMBAUL ULUM",kopLine2:"PORTAL PRESTASI QIRAATI",kopLine3:"",kopLine4:"",logoUrl:"",logoKop:"",logoQiraati:"",alamat:"",noTelp:"",fiturBeranda:!0,fiturKalender:!0,fiturKritikSaran:!0,fiturNotifikasi:!0,namaChannel:"Al Manshur Channel",mahad_tagihan_template:[],mahad_sub_kategori:[],tarif_fullday_default:0},KA=vf("settings",()=>{const n=un({...Jh}),e=un(!1),t=un(null);let r=null;const i=Dt(()=>[n.value.kopLine1,n.value.kopLine2,n.value.kopLine3,n.value.kopLine4].filter(Boolean));let s=null;async function o(m=0){if(!e.value){e.value=!0,t.value=null;try{const[g,b]=await Promise.all([Ny("settings",Qh).catch(()=>null),Ny("settings",Wh).catch(()=>null)]);n.value={...Jh,...b||{},...g||{}}}catch(g){const b=(g==null?void 0:g.code)==="unavailable"||/offline/i.test((g==null?void 0:g.message)||"");if(b&&m<2){e.value=!1,setTimeout(()=>o(m+1),1500);return}t.value=g.message||String(g),b||console.error("[settings/load]",g)}finally{e.value=!1}}}function a(){r||(r=Oy("settings",Wh,m=>{m&&(n.value={...n.value,...m,...c||{}})})),s||(s=Oy("settings",Qh,m=>{m&&(c=m,n.value={...n.value,...m})}))}let c=null;function l(){r&&(r(),r=null),s&&(s(),s=null)}async function h(m){e.value=!0,t.value=null;try{const g={...n.value,...m};await Promise.all([Vy("settings",Qh,g),Vy("settings",Wh,g)]),n.value=g}catch(g){throw t.value=g.message||String(g),g}finally{e.value=!1}}function f(){n.value={...Jh}}return{settings:n,isLoading:e,error:t,kopLines:i,load:o,subscribe:a,unsubscribeNow:l,save:h,reset:f}}),hF={__name:"App",setup(n){const e=KA();return Ms(()=>e.settings,t=>{if(!t)return;const r=document.documentElement;t.themeColor&&r.style.setProperty("--theme-color",t.themeColor),t.themeTextColor&&r.style.setProperty("--theme-text-color",t.themeTextColor),t.sidebarBgColor&&r.style.setProperty("--sidebar-bg",t.sidebarBgColor),t.appTitle&&(document.title=t.appTitle)},{deep:!0,immediate:!0}),(t,r)=>{const i=GR("router-view");return Va(),xa(i,null,{default:ad(({Component:s})=>[qt(FS,{name:"fade",mode:"out-in"},{default:ad(()=>[(Va(),xa(KR(s)))]),_:2},1024)]),_:1})}}};/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Vs=typeof document<"u";function $A(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function dF(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&$A(n.default)}const ke=Object.assign;function Yh(n,e){const t={};for(const r in e){const i=e[r];t[r]=Nn(i)?i.map(n):n(i)}return t}const Pa=()=>{},Nn=Array.isArray;function xy(n,e){const t={};for(const r in n)t[r]=r in e?e[r]:n[r];return t}const zA=/#/g,fF=/&/g,pF=/\//g,mF=/=/g,gF=/\?/g,HA=/\+/g,_F=/%5B/g,yF=/%5D/g,WA=/%5E/g,IF=/%60/g,QA=/%7B/g,vF=/%7C/g,JA=/%7D/g,EF=/%20/g;function Zp(n){return n==null?"":encodeURI(""+n).replace(vF,"|").replace(_F,"[").replace(yF,"]")}function TF(n){return Zp(n).replace(QA,"{").replace(JA,"}").replace(WA,"^")}function Wd(n){return Zp(n).replace(HA,"%2B").replace(EF,"+").replace(zA,"%23").replace(fF,"%26").replace(IF,"`").replace(QA,"{").replace(JA,"}").replace(WA,"^")}function wF(n){return Wd(n).replace(mF,"%3D")}function AF(n){return Zp(n).replace(zA,"%23").replace(gF,"%3F")}function bF(n){return AF(n).replace(pF,"%2F")}function nc(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const RF=/\/$/,SF=n=>n.replace(RF,"");function Xh(n,e,t="/"){let r,i={},s="",o="";const a=e.indexOf("#");let c=e.indexOf("?");return c=a>=0&&c>a?-1:c,c>=0&&(r=e.slice(0,c),s=e.slice(c,a>0?a:e.length),i=n(s.slice(1))),a>=0&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=kF(r??e,t),{fullPath:r+s+o,path:r,query:i,hash:nc(o)}}function PF(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Ly(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function CF(n,e,t){const r=e.matched.length-1,i=t.matched.length-1;return r>-1&&r===i&&co(e.matched[r],t.matched[i])&&YA(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function co(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function YA(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!DF(n[t],e[t]))return!1;return!0}function DF(n,e){return Nn(n)?My(n,e):Nn(e)?My(e,n):(n==null?void 0:n.valueOf())===(e==null?void 0:e.valueOf())}function My(n,e){return Nn(e)?n.length===e.length&&n.every((t,r)=>t===e[r]):n.length===1&&n[0]===e}function kF(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),r=n.split("/"),i=r[r.length-1];(i===".."||i===".")&&r.push("");let s=t.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")s>1&&s--;else break;return t.slice(0,s).join("/")+"/"+r.slice(o).join("/")}const Gr={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Qd=(function(n){return n.pop="pop",n.push="push",n})({}),Zh=(function(n){return n.back="back",n.forward="forward",n.unknown="",n})({});function NF(n){if(!n)if(Vs){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),SF(n)}const VF=/^[^#]+#/;function OF(n,e){return n.replace(VF,"#")+e}function xF(n,e){const t=document.documentElement.getBoundingClientRect(),r=n.getBoundingClientRect();return{behavior:e.behavior,left:r.left-t.left-(e.left||0),top:r.top-t.top-(e.top||0)}}const nh=()=>({left:window.scrollX,top:window.scrollY});function LF(n){let e;if("el"in n){const t=n.el,r=typeof t=="string"&&t.startsWith("#"),i=typeof t=="string"?r?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!i)return;e=xF(i,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Fy(n,e){return(history.state?history.state.position-e:-1)+n}const Jd=new Map;function MF(n,e){Jd.set(n,e)}function FF(n){const e=Jd.get(n);return Jd.delete(n),e}function UF(n){return typeof n=="string"||n&&typeof n=="object"}function XA(n){return typeof n=="string"||typeof n=="symbol"}let rt=(function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n})({});const ZA=Symbol("");rt.MATCHER_NOT_FOUND+"",rt.NAVIGATION_GUARD_REDIRECT+"",rt.NAVIGATION_ABORTED+"",rt.NAVIGATION_CANCELLED+"",rt.NAVIGATION_DUPLICATED+"";function uo(n,e){return ke(new Error,{type:n,[ZA]:!0},e)}function nr(n,e){return n instanceof Error&&ZA in n&&(e==null||!!(n.type&e))}const BF=["params","query","hash"];function qF(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of BF)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function jF(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let r=0;r<t.length;++r){const i=t[r].replace(HA," "),s=i.indexOf("="),o=nc(s<0?i:i.slice(0,s)),a=s<0?null:nc(i.slice(s+1));if(o in e){let c=e[o];Nn(c)||(c=e[o]=[c]),c.push(a)}else e[o]=a}return e}function Uy(n){let e="";for(let t in n){const r=n[t];if(t=wF(t),r==null){r!==void 0&&(e+=(e.length?"&":"")+t);continue}(Nn(r)?r.map(i=>i&&Wd(i)):[r&&Wd(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+t,i!=null&&(e+="="+i))})}return e}function GF(n){const e={};for(const t in n){const r=n[t];r!==void 0&&(e[t]=Nn(r)?r.map(i=>i==null?null:""+i):r==null?r:""+r)}return e}const KF=Symbol(""),By=Symbol(""),rh=Symbol(""),em=Symbol(""),Yd=Symbol("");function Zo(){let n=[];function e(r){return n.push(r),()=>{const i=n.indexOf(r);i>-1&&n.splice(i,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Hr(n,e,t,r,i,s=o=>o()){const o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((a,c)=>{const l=m=>{m===!1?c(uo(rt.NAVIGATION_ABORTED,{from:t,to:e})):m instanceof Error?c(m):UF(m)?c(uo(rt.NAVIGATION_GUARD_REDIRECT,{from:e,to:m})):(o&&r.enterCallbacks[i]===o&&typeof m=="function"&&o.push(m),a())},h=s(()=>n.call(r&&r.instances[i],e,t,l));let f=Promise.resolve(h);n.length<3&&(f=f.then(l)),f.catch(m=>c(m))})}function ed(n,e,t,r,i=s=>s()){const s=[];for(const o of n)for(const a in o.components){let c=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if($A(c)){const l=(c.__vccOpts||c)[e];l&&s.push(Hr(l,t,r,o,a,i))}else{let l=c();s.push(()=>l.then(h=>{if(!h)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=dF(h)?h.default:h;o.mods[a]=h,o.components[a]=f;const m=(f.__vccOpts||f)[e];return m&&Hr(m,t,r,o,a,i)()}))}}return s}function $F(n,e){const t=[],r=[],i=[],s=Math.max(e.matched.length,n.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(n.matched.find(l=>co(l,a))?r.push(a):t.push(a));const c=n.matched[o];c&&(e.matched.find(l=>co(l,c))||i.push(c))}return[t,r,i]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let zF=()=>location.protocol+"//"+location.host;function eb(n,e){const{pathname:t,search:r,hash:i}=e,s=n.indexOf("#");if(s>-1){let o=i.includes(n.slice(s))?n.slice(s).length:1,a=i.slice(o);return a[0]!=="/"&&(a="/"+a),Ly(a,"")}return Ly(t,n)+r+i}function HF(n,e,t,r){let i=[],s=[],o=null;const a=({state:m})=>{const g=eb(n,location),b=t.value,R=e.value;let C=0;if(m){if(t.value=g,e.value=m,o&&o===b){o=null;return}C=R?m.position-R.position:0}else r(g);i.forEach(V=>{V(t.value,b,{delta:C,type:Qd.pop,direction:C?C>0?Zh.forward:Zh.back:Zh.unknown})})};function c(){o=t.value}function l(m){i.push(m);const g=()=>{const b=i.indexOf(m);b>-1&&i.splice(b,1)};return s.push(g),g}function h(){if(document.visibilityState==="hidden"){const{history:m}=window;if(!m.state)return;m.replaceState(ke({},m.state,{scroll:nh()}),"")}}function f(){for(const m of s)m();s=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",h),document.removeEventListener("visibilitychange",h)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",h),document.addEventListener("visibilitychange",h),{pauseListeners:c,listen:l,destroy:f}}function qy(n,e,t,r=!1,i=!1){return{back:n,current:e,forward:t,replaced:r,position:window.history.length,scroll:i?nh():null}}function WF(n){const{history:e,location:t}=window,r={value:eb(n,t)},i={value:e.state};i.value||s(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(c,l,h){const f=n.indexOf("#"),m=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+c:zF()+n+c;try{e[h?"replaceState":"pushState"](l,"",m),i.value=l}catch(g){console.error(g),t[h?"replace":"assign"](m)}}function o(c,l){s(c,ke({},e.state,qy(i.value.back,c,i.value.forward,!0),l,{position:i.value.position}),!0),r.value=c}function a(c,l){const h=ke({},i.value,e.state,{forward:c,scroll:nh()});s(h.current,h,!0),s(c,ke({},qy(r.value,c,null),{position:h.position+1},l),!1),r.value=c}return{location:r,state:i,push:a,replace:o}}function QF(n){n=NF(n);const e=WF(n),t=HF(n,e.state,e.location,e.replace);function r(s,o=!0){o||t.pauseListeners(),history.go(s)}const i=ke({location:"",base:n,go:r,createHref:OF.bind(null,n)},e,t);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function JF(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),QF(n)}let $i=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n})({});var _t=(function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n})(_t||{});const YF={type:$i.Static,value:""},XF=/[a-zA-Z0-9_]/;function ZF(n){if(!n)return[[]];if(n==="/")return[[YF]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(g){throw new Error(`ERR (${t})/"${l}": ${g}`)}let t=_t.Static,r=t;const i=[];let s;function o(){s&&i.push(s),s=[]}let a=0,c,l="",h="";function f(){l&&(t===_t.Static?s.push({type:$i.Static,value:l}):t===_t.Param||t===_t.ParamRegExp||t===_t.ParamRegExpEnd?(s.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),s.push({type:$i.Param,value:l,regexp:h,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),l="")}function m(){l+=c}for(;a<n.length;){if(c=n[a++],c==="\\"&&t!==_t.ParamRegExp){r=t,t=_t.EscapeNext;continue}switch(t){case _t.Static:c==="/"?(l&&f(),o()):c===":"?(f(),t=_t.Param):m();break;case _t.EscapeNext:m(),t=r;break;case _t.Param:c==="("?t=_t.ParamRegExp:XF.test(c)?m():(f(),t=_t.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--);break;case _t.ParamRegExp:c===")"?h[h.length-1]=="\\"?h=h.slice(0,-1)+c:t=_t.ParamRegExpEnd:h+=c;break;case _t.ParamRegExpEnd:f(),t=_t.Static,c!=="*"&&c!=="?"&&c!=="+"&&a--,h="";break;default:e("Unknown state");break}}return t===_t.ParamRegExp&&e(`Unfinished custom RegExp for param "${l}"`),f(),o(),i}const jy="[^/]+?",e1={sensitive:!1,strict:!1,start:!0,end:!0};var Wt=(function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n})(Wt||{});const t1=/[.+*?^${}()[\]/\\]/g;function n1(n,e){const t=ke({},e1,e),r=[];let i=t.start?"^":"";const s=[];for(const l of n){const h=l.length?[]:[Wt.Root];t.strict&&!l.length&&(i+="/");for(let f=0;f<l.length;f++){const m=l[f];let g=Wt.Segment+(t.sensitive?Wt.BonusCaseSensitive:0);if(m.type===$i.Static)f||(i+="/"),i+=m.value.replace(t1,"\\$&"),g+=Wt.Static;else if(m.type===$i.Param){const{value:b,repeatable:R,optional:C,regexp:V}=m;s.push({name:b,repeatable:R,optional:C});const D=V||jy;if(D!==jy){g+=Wt.BonusCustomRegExp;try{`${D}`}catch(M){throw new Error(`Invalid custom RegExp for param "${b}" (${D}): `+M.message)}}let x=R?`((?:${D})(?:/(?:${D}))*)`:`(${D})`;f||(x=C&&l.length<2?`(?:/${x})`:"/"+x),C&&(x+="?"),i+=x,g+=Wt.Dynamic,C&&(g+=Wt.BonusOptional),R&&(g+=Wt.BonusRepeatable),D===".*"&&(g+=Wt.BonusWildcard)}h.push(g)}r.push(h)}if(t.strict&&t.end){const l=r.length-1;r[l][r[l].length-1]+=Wt.BonusStrict}t.strict||(i+="/?"),t.end?i+="$":t.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,t.sensitive?"":"i");function a(l){const h=l.match(o),f={};if(!h)return null;for(let m=1;m<h.length;m++){const g=h[m]||"",b=s[m-1];f[b.name]=g&&b.repeatable?g.split("/"):g}return f}function c(l){let h="",f=!1;for(const m of n){(!f||!h.endsWith("/"))&&(h+="/"),f=!1;for(const g of m)if(g.type===$i.Static)h+=g.value;else if(g.type===$i.Param){const{value:b,repeatable:R,optional:C}=g,V=b in l?l[b]:"";if(Nn(V)&&!R)throw new Error(`Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`);const D=Nn(V)?V.join("/"):V;if(!D)if(C)m.length<2&&(h.endsWith("/")?h=h.slice(0,-1):f=!0);else throw new Error(`Missing required param "${b}"`);h+=D}}return h||"/"}return{re:o,score:r,keys:s,parse:a,stringify:c}}function r1(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=e[t]-n[t];if(r)return r;t++}return n.length<e.length?n.length===1&&n[0]===Wt.Static+Wt.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===Wt.Static+Wt.Segment?1:-1:0}function tb(n,e){let t=0;const r=n.score,i=e.score;for(;t<r.length&&t<i.length;){const s=r1(r[t],i[t]);if(s)return s;t++}if(Math.abs(i.length-r.length)===1){if(Gy(r))return 1;if(Gy(i))return-1}return i.length-r.length}function Gy(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const i1={strict:!1,end:!0,sensitive:!1};function s1(n,e,t){const r=n1(ZF(n.path),t),i=ke(r,{record:n,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function o1(n,e){const t=[],r=new Map;e=xy(i1,e);function i(f){return r.get(f)}function s(f,m,g){const b=!g,R=$y(f);R.aliasOf=g&&g.record;const C=xy(e,f),V=[R];if("alias"in f){const M=typeof f.alias=="string"?[f.alias]:f.alias;for(const H of M)V.push($y(ke({},R,{components:g?g.record.components:R.components,path:H,aliasOf:g?g.record:R})))}let D,x;for(const M of V){const{path:H}=M;if(m&&H[0]!=="/"){const j=m.record.path,E=j[j.length-1]==="/"?"":"/";M.path=m.record.path+(H&&E+H)}if(D=s1(M,m,C),g?g.alias.push(D):(x=x||D,x!==D&&x.alias.push(D),b&&f.name&&!zy(D)&&o(f.name)),nb(D)&&c(D),R.children){const j=R.children;for(let E=0;E<j.length;E++)s(j[E],D,g&&g.children[E])}g=g||D}return x?()=>{o(x)}:Pa}function o(f){if(XA(f)){const m=r.get(f);m&&(r.delete(f),t.splice(t.indexOf(m),1),m.children.forEach(o),m.alias.forEach(o))}else{const m=t.indexOf(f);m>-1&&(t.splice(m,1),f.record.name&&r.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return t}function c(f){const m=u1(f,t);t.splice(m,0,f),f.record.name&&!zy(f)&&r.set(f.record.name,f)}function l(f,m){let g,b={},R,C;if("name"in f&&f.name){if(g=r.get(f.name),!g)throw uo(rt.MATCHER_NOT_FOUND,{location:f});C=g.record.name,b=ke(Ky(m.params,g.keys.filter(x=>!x.optional).concat(g.parent?g.parent.keys.filter(x=>x.optional):[]).map(x=>x.name)),f.params&&Ky(f.params,g.keys.map(x=>x.name))),R=g.stringify(b)}else if(f.path!=null)R=f.path,g=t.find(x=>x.re.test(R)),g&&(b=g.parse(R),C=g.record.name);else{if(g=m.name?r.get(m.name):t.find(x=>x.re.test(m.path)),!g)throw uo(rt.MATCHER_NOT_FOUND,{location:f,currentLocation:m});C=g.record.name,b=ke({},m.params,f.params),R=g.stringify(b)}const V=[];let D=g;for(;D;)V.unshift(D.record),D=D.parent;return{name:C,path:R,params:b,matched:V,meta:c1(V)}}n.forEach(f=>s(f));function h(){t.length=0,r.clear()}return{addRoute:s,resolve:l,removeRoute:o,clearRoutes:h,getRoutes:a,getRecordMatcher:i}}function Ky(n,e){const t={};for(const r of e)r in n&&(t[r]=n[r]);return t}function $y(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:a1(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function a1(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const r in n.components)e[r]=typeof t=="object"?t[r]:t;return e}function zy(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function c1(n){return n.reduce((e,t)=>ke(e,t.meta),{})}function u1(n,e){let t=0,r=e.length;for(;t!==r;){const s=t+r>>1;tb(n,e[s])<0?r=s:t=s+1}const i=l1(n);return i&&(r=e.lastIndexOf(i,r-1)),r}function l1(n){let e=n;for(;e=e.parent;)if(nb(e)&&tb(n,e)===0)return e}function nb({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Hy(n){const e=Tn(rh),t=Tn(em),r=Dt(()=>{const c=Hi(n.to);return e.resolve(c)}),i=Dt(()=>{const{matched:c}=r.value,{length:l}=c,h=c[l-1],f=t.matched;if(!h||!f.length)return-1;const m=f.findIndex(co.bind(null,h));if(m>-1)return m;const g=Wy(c[l-2]);return l>1&&Wy(h)===g&&f[f.length-1].path!==g?f.findIndex(co.bind(null,c[l-2])):m}),s=Dt(()=>i.value>-1&&m1(t.params,r.value.params)),o=Dt(()=>i.value>-1&&i.value===t.matched.length-1&&YA(t.params,r.value.params));function a(c={}){if(p1(c)){const l=e[Hi(n.replace)?"replace":"push"](Hi(n.to)).catch(Pa);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>l),l}return Promise.resolve()}return{route:r,href:Dt(()=>r.value.href),isActive:s,isExactActive:o,navigate:a}}function h1(n){return n.length===1?n[0]:n}const d1=KI({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Hy,setup(n,{slots:e}){const t=ic(Hy(n)),{options:r}=Tn(rh),i=Dt(()=>({[Qy(n.activeClass,r.linkActiveClass,"router-link-active")]:t.isActive,[Qy(n.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const s=e.default&&h1(e.default(t));return n.custom?s:If("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:i.value},s)}}}),f1=d1;function p1(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function m1(n,e){for(const t in e){const r=e[t],i=n[t];if(typeof r=="string"){if(r!==i)return!1}else if(!Nn(i)||i.length!==r.length||r.some((s,o)=>s.valueOf()!==i[o].valueOf()))return!1}return!0}function Wy(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Qy=(n,e,t)=>n??e??t,g1=KI({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const r=Tn(Yd),i=Dt(()=>n.route||r.value),s=Tn(By,0),o=Dt(()=>{let l=Hi(s);const{matched:h}=i.value;let f;for(;(f=h[l])&&!f.components;)l++;return l}),a=Dt(()=>i.value.matched[o.value]);au(By,Dt(()=>o.value+1)),au(KF,a),au(Yd,i);const c=un();return Ms(()=>[c.value,a.value,n.name],([l,h,f],[m,g,b])=>{h&&(h.instances[f]=l,g&&g!==h&&l&&l===m&&(h.leaveGuards.size||(h.leaveGuards=g.leaveGuards),h.updateGuards.size||(h.updateGuards=g.updateGuards))),l&&h&&(!g||!co(h,g)||!m)&&(h.enterCallbacks[f]||[]).forEach(R=>R(l))},{flush:"post"}),()=>{const l=i.value,h=n.name,f=a.value,m=f&&f.components[h];if(!m)return Jy(t.default,{Component:m,route:l});const g=f.props[h],b=g?g===!0?l.params:typeof g=="function"?g(l):g:null,C=If(m,ke({},b,e,{onVnodeUnmounted:V=>{V.component.isUnmounted&&(f.instances[h]=null)},ref:c}));return Jy(t.default,{Component:C,route:l})||C}}});function Jy(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const _1=g1;function y1(n){const e=o1(n.routes,n),t=n.parseQuery||jF,r=n.stringifyQuery||Uy,i=n.history,s=Zo(),o=Zo(),a=Zo(),c=lR(Gr);let l=Gr;Vs&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const h=Yh.bind(null,B=>""+B),f=Yh.bind(null,bF),m=Yh.bind(null,nc);function g(B,ie){let te,ce;return XA(B)?(te=e.getRecordMatcher(B),ce=ie):ce=B,e.addRoute(ce,te)}function b(B){const ie=e.getRecordMatcher(B);ie&&e.removeRoute(ie)}function R(){return e.getRoutes().map(B=>B.record)}function C(B){return!!e.getRecordMatcher(B)}function V(B,ie){if(ie=ke({},ie||c.value),typeof B=="string"){const k=Xh(t,B,ie.path),U=e.resolve({path:k.path},ie),G=i.createHref(k.fullPath);return ke(k,U,{params:m(U.params),hash:nc(k.hash),redirectedFrom:void 0,href:G})}let te;if(B.path!=null)te=ke({},B,{path:Xh(t,B.path,ie.path).path});else{const k=ke({},B.params);for(const U in k)k[U]==null&&delete k[U];te=ke({},B,{params:f(k)}),ie.params=f(ie.params)}const ce=e.resolve(te,ie),ve=B.hash||"";ce.params=h(m(ce.params));const w=PF(r,ke({},B,{hash:TF(ve),path:ce.path})),S=i.createHref(w);return ke({fullPath:w,hash:ve,query:r===Uy?GF(B.query):B.query||{}},ce,{redirectedFrom:void 0,href:S})}function D(B){return typeof B=="string"?Xh(t,B,c.value.path):ke({},B)}function x(B,ie){if(l!==B)return uo(rt.NAVIGATION_CANCELLED,{from:ie,to:B})}function M(B){return E(B)}function H(B){return M(ke(D(B),{replace:!0}))}function j(B,ie){const te=B.matched[B.matched.length-1];if(te&&te.redirect){const{redirect:ce}=te;let ve=typeof ce=="function"?ce(B,ie):ce;return typeof ve=="string"&&(ve=ve.includes("?")||ve.includes("#")?ve=D(ve):{path:ve},ve.params={}),ke({query:B.query,hash:B.hash,params:ve.path!=null?{}:B.params},ve)}}function E(B,ie){const te=l=V(B),ce=c.value,ve=B.state,w=B.force,S=B.replace===!0,k=j(te,ce);if(k)return E(ke(D(k),{state:typeof k=="object"?ke({},ve,k.state):ve,force:w,replace:S}),ie||te);const U=te;U.redirectedFrom=ie;let G;return!w&&CF(r,ce,te)&&(G=uo(rt.NAVIGATION_DUPLICATED,{to:U,from:ce}),_n(ce,ce,!0,!1)),(G?Promise.resolve(G):v(U,ce)).catch(q=>nr(q)?nr(q,rt.NAVIGATION_GUARD_REDIRECT)?q:bn(q):Te(q,U,ce)).then(q=>{if(q){if(nr(q,rt.NAVIGATION_GUARD_REDIRECT))return E(ke({replace:S},D(q.to),{state:typeof q.to=="object"?ke({},ve,q.to.state):ve,force:w}),ie||U)}else q=A(U,ce,!0,S,ve);return P(U,ce,q),q})}function _(B,ie){const te=x(B,ie);return te?Promise.reject(te):Promise.resolve()}function y(B){const ie=Or.values().next().value;return ie&&typeof ie.runWithContext=="function"?ie.runWithContext(B):B()}function v(B,ie){let te;const[ce,ve,w]=$F(B,ie);te=ed(ce.reverse(),"beforeRouteLeave",B,ie);for(const k of ce)k.leaveGuards.forEach(U=>{te.push(Hr(U,B,ie))});const S=_.bind(null,B,ie);return te.push(S),Xt(te).then(()=>{te=[];for(const k of s.list())te.push(Hr(k,B,ie));return te.push(S),Xt(te)}).then(()=>{te=ed(ve,"beforeRouteUpdate",B,ie);for(const k of ve)k.updateGuards.forEach(U=>{te.push(Hr(U,B,ie))});return te.push(S),Xt(te)}).then(()=>{te=[];for(const k of w)if(k.beforeEnter)if(Nn(k.beforeEnter))for(const U of k.beforeEnter)te.push(Hr(U,B,ie));else te.push(Hr(k.beforeEnter,B,ie));return te.push(S),Xt(te)}).then(()=>(B.matched.forEach(k=>k.enterCallbacks={}),te=ed(w,"beforeRouteEnter",B,ie,y),te.push(S),Xt(te))).then(()=>{te=[];for(const k of o.list())te.push(Hr(k,B,ie));return te.push(S),Xt(te)}).catch(k=>nr(k,rt.NAVIGATION_CANCELLED)?k:Promise.reject(k))}function P(B,ie,te){a.list().forEach(ce=>y(()=>ce(B,ie,te)))}function A(B,ie,te,ce,ve){const w=x(B,ie);if(w)return w;const S=ie===Gr,k=Vs?history.state:{};te&&(ce||S?i.replace(B.fullPath,ke({scroll:S&&k&&k.scroll},ve)):i.push(B.fullPath,ve)),c.value=B,_n(B,ie,te,S),bn()}let T;function Se(){T||(T=i.listen((B,ie,te)=>{if(!sn.listening)return;const ce=V(B),ve=j(ce,sn.currentRoute.value);if(ve){E(ke(ve,{replace:!0,force:!0}),ce).catch(Pa);return}l=ce;const w=c.value;Vs&&MF(Fy(w.fullPath,te.delta),nh()),v(ce,w).catch(S=>nr(S,rt.NAVIGATION_ABORTED|rt.NAVIGATION_CANCELLED)?S:nr(S,rt.NAVIGATION_GUARD_REDIRECT)?(E(ke(D(S.to),{force:!0}),ce).then(k=>{nr(k,rt.NAVIGATION_ABORTED|rt.NAVIGATION_DUPLICATED)&&!te.delta&&te.type===Qd.pop&&i.go(-1,!1)}).catch(Pa),Promise.reject()):(te.delta&&i.go(-te.delta,!1),Te(S,ce,w))).then(S=>{S=S||A(ce,w,!1),S&&(te.delta&&!nr(S,rt.NAVIGATION_CANCELLED)?i.go(-te.delta,!1):te.type===Qd.pop&&nr(S,rt.NAVIGATION_ABORTED|rt.NAVIGATION_DUPLICATED)&&i.go(-1,!1)),P(ce,w,S)}).catch(Pa)}))}let ut=Zo(),Oe=Zo(),pe;function Te(B,ie,te){bn(B);const ce=Oe.list();return ce.length?ce.forEach(ve=>ve(B,ie,te)):console.error(B),Promise.reject(B)}function rn(){return pe&&c.value!==Gr?Promise.resolve():new Promise((B,ie)=>{ut.add([B,ie])})}function bn(B){return pe||(pe=!B,Se(),ut.list().forEach(([ie,te])=>B?te(B):ie()),ut.reset()),B}function _n(B,ie,te,ce){const{scrollBehavior:ve}=n;if(!Vs||!ve)return Promise.resolve();const w=!te&&FF(Fy(B.fullPath,0))||(ce||!te)&&history.state&&history.state.scroll||null;return hl().then(()=>ve(B,ie,w)).then(S=>S&&LF(S)).catch(S=>Te(S,B,ie))}const Xe=B=>i.go(B);let Ze;const Or=new Set,sn={currentRoute:c,listening:!0,addRoute:g,removeRoute:b,clearRoutes:e.clearRoutes,hasRoute:C,getRoutes:R,resolve:V,options:n,push:M,replace:H,go:Xe,back:()=>Xe(-1),forward:()=>Xe(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:Oe.add,isReady:rn,install(B){B.component("RouterLink",f1),B.component("RouterView",_1),B.config.globalProperties.$router=sn,Object.defineProperty(B.config.globalProperties,"$route",{enumerable:!0,get:()=>Hi(c)}),Vs&&!Ze&&c.value===Gr&&(Ze=!0,M(i.location).catch(ce=>{}));const ie={};for(const ce in Gr)Object.defineProperty(ie,ce,{get:()=>c.value[ce],enumerable:!0});B.provide(rh,sn),B.provide(em,PI(ie)),B.provide(Yd,c);const te=B.unmount;Or.add(B),B.unmount=function(){Or.delete(B),Or.size<1&&(l=Gr,T&&T(),T=null,c.value=Gr,Ze=!1,pe=!1),te()}}};function Xt(B){return B.reduce((ie,te)=>ie.then(()=>y(te)),Promise.resolve())}return sn}function jU(){return Tn(rh)}function GU(n){return Tn(em)}const rb=new Bn;function ea(n){return"mu_auth_"+String(n||"")}function I1(n){const e=String(n||"").toLowerCase().replace(/[^a-z0-9._-]/g,"");return e?e+"@portal-mu.local":null}async function v1(n){const e=String(n||"").trim(),t=e.toLowerCase(),r=e.replace(/\D/g,"");try{const h=await Ja(fn(gt,"settings","web")),f=(h.exists()?h.data().adminUsername:"adminmu")||"adminmu";if(t==="adminmu"||t===f.toLowerCase())return{source:"admin",data:{id:"admin",username:f},authKey:f.toLowerCase()}}catch{if(t==="adminmu")return{source:"admin",data:{id:"admin",username:"adminmu"},authKey:"adminmu"}}const i=Ar(gt,"guru");let s=null,o=await Sn(En(i,Un("username","==",e),cr(1)));if(o.empty||(s=o.docs[0]),!s&&r.length>=8&&(o=await Sn(En(i,Un("wa","==",r),cr(1))),o.empty||(s=o.docs[0])),!s&&/[a-z]/i.test(e)&&(s=(await Sn(En(i))).docs.find(f=>String(f.data().username||"").toLowerCase()===t)),s){const h={id:s.id,...s.data()},f=String(h.wa||"").replace(/\D/g,""),m=f.length>=8?f:h.username||String(h.id);return{source:"guru",data:h,authKey:m}}const a=Ar(gt,"santri");let c=null,l=await Sn(En(a,Un("username","==",e),cr(1)));if(l.empty||(c=l.docs[0]),!c&&r.length>=8&&(l=await Sn(En(a,Un("wa","==",r),cr(1))),l.empty||(c=l.docs[0])),c||(l=await Sn(En(a,Un("nis","==",e),cr(1))),l.empty||(c=l.docs[0])),!c&&/[a-z]/i.test(e)&&(c=(await Sn(En(a))).docs.find(f=>String(f.data().username||"").toLowerCase()===t)),c){const h={id:c.id,...c.data()},f=String(h.wa||"").replace(/\D/g,""),m=f.length>=8?f:h.username||h.nis||String(h.id);return{source:"santri",data:h,authKey:m}}return null}async function E1(n,e,t=!0){if(await Ju(cn,t?Hl:Wl),n.source==="admin"){const a=await Ja(fn(gt,"settings","admin")).catch(()=>null),c=await Ja(fn(gt,"settings","web")).catch(()=>null),l=(a==null?void 0:a.exists())&&(a.data().password||a.data().adminPassword)||(c==null?void 0:c.exists())&&c.data().adminPassword||"1234";if(e!==l){const h=new Error("Sandi admin salah");throw h.code="auth/wrong-password",h}return{authMethod:"admin-builtin",user:null}}const r=I1(n.authKey);if(!r)throw new Error("Username/WA tidak valid untuk Auth");let i=null;try{return i=await ha(cn,r,ea(e)),{authMethod:"firebase-padded",user:i.user}}catch(a){const c=a.code||"";if(!["auth/wrong-password","auth/invalid-credential","auth/invalid-login-credentials","auth/user-not-found"].includes(c))throw a;try{i=await ha(cn,r,e);try{const{updatePassword:h}=await ge(async()=>{const{updatePassword:f}=await Promise.resolve().then(()=>JL);return{updatePassword:f}},void 0);await h(i.user,ea(e))}catch(h){console.warn("[auth] Password upgrade fail:",h.message)}return{authMethod:"firebase-raw-upgraded",user:i.user}}catch(h){if(!["auth/wrong-password","auth/invalid-credential","auth/invalid-login-credentials","auth/user-not-found"].includes(h.code))throw h}}const s=n.data.password||"1234";if(e!==s){const a=new Error("Kata sandi salah");throw a.code="auth/wrong-password",a}const o=GA();if(!o)throw new Error("Secondary Firebase Auth init fail");try{const a=await rA(o,r,ea(e));try{await wc(fn(gt,n.source,String(n.data.id)),{firebase_uid:a.user.uid,email_auth:r,password_migrated:!0})}catch(l){console.warn("[auth] Firestore migration tag fail:",l.message)}try{await Mp(o)}catch{}return{authMethod:"firebase-migrated",user:(await ha(cn,r,ea(e))).user}}catch(a){if(a.code==="auth/email-already-in-use")return{authMethod:"firebase-already-exists",user:(await ha(cn,r,ea(e))).user};throw a}}async function KU(){return Kp(cn,rb)}async function $U(n,e){if(!["guru","santri"].includes(n))throw new Error("linkGoogleAccount: collection harus guru/santri");const t=await Kp(cn,rb),r=t==null?void 0:t.user;if(!(r!=null&&r.uid))throw new Error("Gagal dapat UID Google");const i=await Sn(En(Ar(gt,"guru"),Un("linked_uid","==",r.uid),cr(1))),s=await Sn(En(Ar(gt,"santri"),Un("linked_uid","==",r.uid),cr(1))),o=[];if(i.forEach(a=>{(n!=="guru"||String(a.id)!==String(e))&&o.push(`guru/${a.id}`)}),s.forEach(a=>{(n!=="santri"||String(a.id)!==String(e))&&o.push(`santri/${a.id}`)}),o.length>0)throw new Error(`Akun Google ini sudah dipakai oleh: ${o.join(", ")}. Unlink dulu sebelum link ulang.`);return await wc(fn(gt,n,String(e)),{linked_uid:r.uid,linked_email:r.email||"",linked_at:new Date().toISOString()}),{uid:r.uid,email:r.email||""}}async function zU(n,e){if(!["guru","santri"].includes(n))throw new Error("unlinkGoogleAccount: collection harus guru/santri");await wc(fn(gt,n,String(e)),{linked_uid:null,linked_email:null,unlinked_at:new Date().toISOString()})}async function td(){return Mp(cn)}const Yy="@portal-mu.local",Xd="portalMu_sesiAdminBuiltIn";function nd(n){try{n&&n.auth_method==="admin-builtin"?localStorage.setItem(Xd,JSON.stringify(n)):localStorage.removeItem(Xd)}catch{}}function T1(){try{const n=localStorage.getItem(Xd);if(!n)return null;const e=JSON.parse(n);return e&&e.auth_method==="admin-builtin"&&e.role==="admin"?e:null}catch{return null}}const ib=vf("auth",()=>{const n=un(null),e=un(null),t=un(!1),r=un(null);let i=null;const s=new Promise(V=>{i=V}),o=Dt(()=>n.value!==null),a=Dt(()=>{var V;return((V=n.value)==null?void 0:V.role)==="admin"}),c=Dt(()=>{var V;return((V=n.value)==null?void 0:V.role)==="guru"}),l=Dt(()=>{var V;return((V=n.value)==null?void 0:V.role)==="santri"});function h(V){var x;if(!n.value)return!1;const D=n.value;return D.id==="admin"||D.role_sistem==="super_admin"||D.role_sistem==="admin_keuangan"&&V==="akses_keuangan"||D.role_sistem==="admin"&&V!=="akses_keuangan"?!0:((x=D.akses)==null?void 0:x[V])===!0}async function f(V,D,x=!0){var M,H,j,E;t.value=!0,r.value=null;try{const _=await v1(V);if(!_){const v=new Error("Username tidak ditemukan. Pastikan ketik dengan benar — Guru/Pegawai bisa pakai username atau no WA, Santri pakai NIS atau no WA wali.");throw v.code="auth/not-found",v}if(_.source==="guru"&&_.data.status==="Tidak Aktif")throw new Error("Akun guru berstatus tidak aktif. Hubungi administrator.");if(_.source==="santri"&&_.data.aktif===!1)throw new Error("Akun santri tidak aktif. Hubungi administrator.");const y=await E1(_,D,x);if(_.source==="admin"){n.value={id:"admin",role:"admin",role_sistem:"super_admin",nama:"Administrator",guru:"Admin Utama",jk:"L",jabatan:"Administrator",lembaga:"Semua Data",akses:{kelola_guru:!0,akses_keuangan:!0,kelola_santri:!0,kelola_lembaga:!0,kelola_kelas:!0},auth_method:"admin-builtin"},nd(n.value);return}if(_.source!=="admin"&&nd(null),_.source==="guru"){const v=_.data,P=v.role_sistem||"user",A=["admin","admin_keuangan","super_admin"].includes(P);n.value={id:v.id,role:A?"admin":"guru",role_sistem:P,nama:v.nama,guru:v.nama,lembaga:A?"Semua Data":v.lembaga||"",jk:v.jk||"",jabatan:v.jabatan||"",username:v.username||"",wa:v.wa||"",foto:v.foto||"",akses:v.akses||{},auth_method:y.authMethod,firebase_uid:(M=y.user)==null?void 0:M.uid,firebase_email:(H=y.user)==null?void 0:H.email},e.value=y.user;return}if(_.source==="santri"){const v=_.data;n.value={id:v.id,role:"santri",role_sistem:"santri",nama:v.nama,nis:v.nis||"",username:v.username||"",wa:v.wa||"",foto:v.foto||"",lembaga:v.lembaga||"",kelas:v.kelas||"",wali:v.wali||"",auth_method:y.authMethod,firebase_uid:(j=y.user)==null?void 0:j.uid,firebase_email:(E=y.user)==null?void 0:E.email},e.value=y.user;return}}catch(_){const y=_.code||"";let v=_.message||String(_);y==="auth/wrong-password"||y==="auth/invalid-credential"?v="Kata sandi salah":y==="auth/too-many-requests"?v="Terlalu banyak percobaan. Coba lagi dalam beberapa menit.":y==="auth/network-request-failed"&&(v="Koneksi bermasalah. Periksa internet Anda."),r.value=v;const P=new Error(v);throw P.code=y,P}finally{t.value=!1}}async function m(V){if(!V)return;const D=V.uid,x=(V.email||"").toLowerCase();let M=await Ss("guru",[["linked_uid","==",D]],[],1),H=[];if(M.length===0&&(H=await Ss("santri",[["linked_uid","==",D]],[],1)),M.length===0&&H.length===0&&x&&(M=await Ss("guru",[["linked_email","==",x]],[],1),M.length===0&&(H=await Ss("santri",[["linked_email","==",x]],[],1))),M.length===0&&H.length===0&&x.endsWith(Yy)){const j=x.replace(Yy,"");j&&j!=="admin"&&(M=await Ss("guru",[["wa","==",j]],[],1),M.length===0&&(H=await Ss("santri",[["wa","==",j]],[],1)))}if(M.length>0){const j=M[0];if(j.status==="Tidak Aktif")throw await td(),new Error("Akun guru berstatus tidak aktif");const E=j.role_sistem||"user",_=["admin","admin_keuangan","super_admin"].includes(E);n.value={id:j.id,role:_?"admin":"guru",role_sistem:E,nama:j.nama,guru:j.nama,lembaga:_?"Semua Data":j.lembaga||"",jk:j.jk||"",jabatan:j.jabatan||"",username:j.username||"",wa:j.wa||"",foto:j.foto||"",akses:j.akses||{},auth_method:"firebase",firebase_uid:D,firebase_email:V.email};return}if(H.length>0){const j=H[0];if(j.aktif===!1)throw await td(),new Error("Akun santri tidak aktif");n.value={id:j.id,role:"santri",role_sistem:"santri",nama:j.nama,nis:j.nis||"",username:j.username||"",wa:j.wa||"",foto:j.foto||"",lembaga:j.lembaga||"",kelas:j.kelas||"",wali:j.wali||"",auth_method:"firebase",firebase_uid:D,firebase_email:V.email};return}throw console.warn("[auth.loadSesiFromUser] Firebase user authenticated tapi tidak match guru/santri:",x),n.value=null,new Error("Akun terautentikasi tapi belum terdaftar sebagai guru/santri di sistem.")}async function g(){await td(),n.value=null,e.value=null,nd(null)}function b(V){n.value=V}function R(){if(n.value||cn.currentUser)return;const V=T1();V&&(n.value=V)}function C(){R(),Ju(cn,qp).catch(()=>Ju(cn,Hl)).catch(D=>{console.warn("[auth.initAuth] setPersistence fail:",D==null?void 0:D.message)});let V=!1;cA(cn,async D=>{if(D){e.value=D;try{await m(D)}catch(x){console.warn("[auth.initAuth] loadSesiFromUser fail:",x.message)}}!V&&i&&(V=!0,i())}),setTimeout(()=>{!V&&i&&(V=!0,i())},3e3)}return{sesiAktif:n,fbUser:e,isLoading:t,error:r,authReady:s,isLoggedIn:o,isAdmin:a,isGuru:c,isSantri:l,hasAccess:h,cekHakAkses:h,login:f,logout:g,setSesi:b,setSesiAktif:b,restoreAdminSesiFromStorage:R,initAuth:C,loadSesiFromUser:m}}),w1=()=>ge(()=>import("./LoginView-CIQC78Eu.js"),__vite__mapDeps([0,1,2])),A1=()=>ge(()=>import("./DashboardView-Aozrb32k.js"),__vite__mapDeps([3,1,4,5,6,7,8,9,10])),b1=()=>ge(()=>import("./PengaturanView-BT2U2_bE.js"),__vite__mapDeps([11,2,12,5,13,14,7])),R1=()=>ge(()=>import("./ProfilView-CJHAeSyS.js"),__vite__mapDeps([15,1,13,2,12,6])),S1=()=>ge(()=>import("./SantriView-D6jqTAL_.js"),__vite__mapDeps([16,17,5,18,6,19,20,21,2,12])),P1=()=>ge(()=>import("./GuruView-0JzVQkF3.js"),__vite__mapDeps([22,19,2,20,21,4,5,12,6])),C1=()=>ge(()=>import("./KelasView-ByHr-1ml.js"),__vite__mapDeps([23,5])),D1=()=>ge(()=>import("./FieldSchemaView-DR0rTnxP.js"),__vite__mapDeps([24,8])),k1=()=>ge(()=>import("./MasterFormBridgeView-DokLwU_z.js"),__vite__mapDeps([25,8])),N1=()=>ge(()=>import("./KeuanganDashboardView-BB2e2OyU.js"),__vite__mapDeps([26,27,6])),V1=()=>ge(()=>import("./TagihanView-BJeP72gv.js"),__vite__mapDeps([28,2,12,6,29,30])),O1=()=>ge(()=>import("./TabunganView-SfoSKMF6.js"),__vite__mapDeps([31,1,29,30,18,2,27,6])),x1=()=>ge(()=>import("./BisyarohView-BSZCnSIW.js"),__vite__mapDeps([32,29,30,27,4,5,2,6])),L1=()=>ge(()=>import("./KritikSaranView-CA6Qnbbg.js"),__vite__mapDeps([33,2,12])),M1=()=>ge(()=>import("./AbsensiGuruView-DK430trX.js"),__vite__mapDeps([34,19,2,21])),Xy=()=>ge(()=>import("./SantriFormView-DLlsY1nN.js"),__vite__mapDeps([35,2,6])),Zy=()=>ge(()=>import("./GuruFormView-BeGuyFb8.js"),__vite__mapDeps([36,2,6])),eI=()=>ge(()=>import("./LembagaFormView-BhKSVL2H.js"),__vite__mapDeps([37,2])),F1=()=>ge(()=>import("./LembagaDetailView-Cfys39WO.js"),__vite__mapDeps([38,5,2,12,13,39])),U1=()=>ge(()=>import("./AbsensiSantriView-DT97nl0O.js"),__vite__mapDeps([40,2,29,18])),B1=()=>ge(()=>import("./PostsView-DqQcj5TC.js"),__vite__mapDeps([41,13,2,12,8,42])),q1=()=>ge(()=>import("./BukuIndukView-Buwsw-LM.js"),__vite__mapDeps([43,2,19,6,20,21,29,30,44])),j1=()=>ge(()=>import("./LaporanKeuanganView-CLdkotM8.js"),__vite__mapDeps([45,6])),G1=()=>ge(()=>import("./PpdbFormView-BudCtckU.js"),[]),K1=()=>ge(()=>import("./PpdbAdminView-DGwMpqPP.js"),__vite__mapDeps([46,2])),$1=()=>ge(()=>import("./PpdbDetailView-BXR6ffnB.js"),__vite__mapDeps([47,2,12])),z1=()=>ge(()=>import("./PosSantriView-jDylVt67.js"),__vite__mapDeps([48,2,18,44,20,21,8,49])),H1=()=>ge(()=>import("./RiwayatPosView-Cmg8BDbt.js"),__vite__mapDeps([50,2,44,20,21,29,30])),W1=()=>ge(()=>import("./RiwayatSantriView-Cwl9llEF.js"),__vite__mapDeps([51,2,18,20,21])),Q1=()=>ge(()=>import("./NaikKelasView-DbrFNKIS.js"),__vite__mapDeps([52,2,4,5,19,18,20,21,8,53])),J1=()=>ge(()=>import("./KalenderKegiatanView-DNwkWpra.js"),__vite__mapDeps([54,2,12,7])),Y1=()=>ge(()=>import("./StatistikView-BtTHAwln.js"),__vite__mapDeps([55,17,5,18,4,29])),X1=()=>ge(()=>import("./InputBulananView-C2orArJL.js"),__vite__mapDeps([56,17,5,18,4,2,8,57])),Z1=()=>ge(()=>import("./RekapPrestasiView-Bn40M-Ak.js"),__vite__mapDeps([58,2,19,6,20,21,29,18])),eU=()=>ge(()=>import("./RekapDiniyahView-Bsv5dH9P.js"),__vite__mapDeps([59,2,17,5,18])),tU=()=>ge(()=>import("./RaporView-ebgNNcea.js"),__vite__mapDeps([60,17,5,18,4,2,39,20,21,29,8,61])),nU=()=>ge(()=>import("./PengaturanKeuanganView-XPJEgFTQ.js"),__vite__mapDeps([62,4,5,2])),rU=()=>ge(()=>import("./MasterDataView-mEc6XYQ8.js"),__vite__mapDeps([63,2,5,18,12,22,19,20,21,4,6,16,17])),iU=()=>ge(()=>import("./KegiatanPesantrenView-FNGZkDJQ.js"),__vite__mapDeps([64,17,5,18,2,19])),sU=()=>ge(()=>import("./HutangPiutangView-C0coPxpv.js"),__vite__mapDeps([65,2,12,6,29])),oU=()=>ge(()=>import("./PembayaranView-DAL2FbgG.js"),__vite__mapDeps([66,6])),aU=()=>ge(()=>import("./CapaianPrestasiView-BfvFrH7C.js"),__vite__mapDeps([67,1,17,5,18])),cU=()=>ge(()=>import("./PersonalView-rD3USgCo.js"),__vite__mapDeps([68,6])),uU=()=>ge(()=>import("./AppLayout-R162XNxp.js"),__vite__mapDeps([69,9,2,7,12,6,14,8,70])),lU=[{path:"/",redirect:"/dashboard"},{path:"/login",name:"login",component:w1,meta:{public:!0}},{path:"/psb-form",name:"psb-form",component:G1,meta:{public:!0}},{path:"/",component:uU,children:[{path:"dashboard",name:"dashboard",component:A1},{path:"profil",name:"profil",component:R1},{path:"santri",name:"santri",component:S1},{path:"santri/new",name:"santri-new",component:Xy,meta:{admin:!0}},{path:"santri/:id/edit",name:"santri-edit",component:Xy,meta:{admin:!0}},{path:"guru",name:"guru",component:P1,meta:{admin:!0}},{path:"guru/new",name:"guru-new",component:Zy,meta:{admin:!0}},{path:"guru/:id/edit",name:"guru-edit",component:Zy,meta:{admin:!0}},{path:"lembaga",name:"lembaga",redirect:{path:"/master-data",query:{tab:"lembaga"}}},{path:"lembaga/new",name:"lembaga-new",component:eI,meta:{admin:!0}},{path:"lembaga/:id/edit",name:"lembaga-edit",component:eI,meta:{admin:!0}},{path:"lembaga/:id",name:"lembaga-detail",component:F1,meta:{admin:!0}},{path:"kelas",name:"kelas",component:C1,meta:{admin:!0}},{path:"master-form/:entity",name:"master-form",component:k1,meta:{admin:!0}},{path:"field-schema",name:"field-schema",component:D1,meta:{admin:!0}},{path:"keuangan",name:"keuangan",component:N1,meta:{admin:!0}},{path:"tagihan",name:"tagihan",component:V1},{path:"pembayaran",name:"pembayaran",component:oU},{path:"pos-santri",name:"pos-santri",component:z1,meta:{admin:!0}},{path:"pos-riwayat",name:"pos-riwayat",component:H1,meta:{admin:!0}},{path:"riwayat-santri",name:"riwayat-santri",component:W1,meta:{admin:!0}},{path:"tabungan",name:"tabungan",component:O1},{path:"bisyaroh",name:"bisyaroh",component:x1},{path:"rapor",name:"rapor",component:tU},{path:"naik-kelas",name:"naik-kelas",component:Q1,alias:"/kenaikan"},{path:"absensi-guru",name:"absensi-guru",component:M1,meta:{admin:!0}},{path:"absensi-santri",name:"absensi-santri",component:U1},{path:"posts",name:"posts",component:B1,alias:"/mading"},{path:"buku-induk",name:"buku-induk",component:q1,meta:{admin:!0}},{path:"hutang-piutang",name:"hutang-piutang",component:sU,meta:{admin:!0}},{path:"laporan-keuangan",name:"laporan-keuangan",component:j1,meta:{admin:!0}},{path:"psb",name:"psb",component:K1,meta:{admin:!0}},{path:"psb/:id",name:"psb-detail",component:$1,meta:{admin:!0}},{path:"kritik-saran",name:"kritik-saran",component:L1},{path:"pengaturan-web",name:"pengaturan-web",component:b1,meta:{admin:!0}},{path:"keu-pengaturan",name:"keu-pengaturan",component:nU,meta:{admin:!0},alias:"/pengaturan-keuangan"},{path:"kegiatan-pesantren",name:"kegiatan-pesantren",component:iU,meta:{admin:!0}},{path:"kalender",name:"kalender",component:J1,alias:"/kalender-kegiatan"},{path:"statistik",name:"statistik",component:Y1},{path:"input-bulanan",name:"input-bulanan",component:X1},{path:"rekap-prestasi",name:"rekap-prestasi",component:Z1},{path:"rekap-diniyah",name:"rekap-diniyah",component:eU},{path:"master-data",name:"master-data",component:rU,meta:{admin:!0,roleSistem:"super_admin"}},{path:"capaian-prestasi",name:"capaian-prestasi",component:aU},{path:"personal",name:"personal",component:cU}]},{path:"/:pathMatch(.*)*",redirect:"/dashboard"}],el=y1({history:JF(),routes:lU}),hU=["/login","/psb-form"];el.beforeEach(async(n,e,t)=>{var i,s,o,a;const r=ib();if((i=n.meta)!=null&&i.public||hU.includes(n.path))return t();if(r.authReady)try{await r.authReady}catch{}if(!r.isLoggedIn)return t({name:"login",query:{redirect:n.fullPath}});if((s=n.meta)!=null&&s.admin&&!r.isAdmin)return t({name:"dashboard"});if((o=n.meta)!=null&&o.roleSistem&&((a=r.sesiAktif)==null?void 0:a.role_sistem)!==n.meta.roleSistem)return t({name:"dashboard"});t()});let tI=!1;el.afterEach(()=>{tI||(tI=!0,setTimeout(()=>{el.getRoutes().forEach(e=>{var r;const t=(r=e.components)==null?void 0:r.default;if(typeof t=="function")try{t()}catch{}})},800))});let dU=0;const fU=vf("ui",()=>{function n(){return typeof window<"u"&&window.innerWidth>=768}const e=un(n());function t(){e.value=!0}function r(){e.value=!1}function i(){e.value=!e.value}const s=un(!1);function o(R){s.value=!!R,typeof document<"u"&&(document.documentElement.classList.toggle("dark",s.value),document.body.classList.toggle("dark-mode",s.value));try{localStorage.setItem("portalMu_darkMode",s.value?"1":"0")}catch{}}function a(){o(!s.value)}function c(){try{if(!localStorage.getItem("portalMu_themeMigrated_v48")){localStorage.setItem("portalMu_darkMode","0"),localStorage.setItem("portalMu_themeMigrated_v48","1"),o(!1);return}const C=localStorage.getItem("portalMu_darkMode");if(C!=null){o(C==="1");return}}catch{}o(!1)}const l=un([]);function h(R,C,V=3e3){const D=++dU;return l.value.push({id:D,type:R,msg:C,ttl:V}),setTimeout(()=>{const x=l.value.findIndex(M=>M.id===D);x>=0&&l.value.splice(x,1)},V),D}const f={info:(R,C)=>h("info",R,C),success:(R,C)=>h("success",R,C),error:(R,C)=>h("error",R,C??5e3),warning:(R,C)=>h("warning",R,C??4e3)},m=un({open:!1,title:"",message:"",confirmText:"Hapus",cancelText:"Batal",danger:!0,_resolve:null});function g({title:R="Konfirmasi",message:C="",confirmText:V="Hapus",cancelText:D="Batal",danger:x=!0}={}){return new Promise(M=>{m.value={open:!0,title:R,message:C,confirmText:V,cancelText:D,danger:x,_resolve:M}})}function b(R){const C=m.value._resolve;m.value.open=!1,m.value._resolve=null,C&&C(!!R)}return{sidebarOpen:e,openSidebar:t,closeSidebar:r,toggleSidebar:i,isDark:s,setDark:o,toggleDark:a,initDarkFromStorage:c,toasts:l,toast:f,confirmState:m,confirm:g,confirmResolve:b}}),tm=mP(hF),ih=yP();tm.use(ih);tm.use(el);const pU=fU(ih);pU.initDarkFromStorage();const mU=ib(ih);mU.initAuth();const nI=KA(ih);nI.load().then(()=>nI.subscribe()).catch(()=>{});function sb(){const n=document.getElementById("splash-screen");n&&!n.classList.contains("fade-out")?(n.classList.add("fade-out"),setTimeout(()=>{document.body.classList.add("app-running")},600)):document.body.classList.contains("app-running")||document.body.classList.add("app-running")}try{tm.mount("#app")}catch(n){console.error("[main.js] Vue app.mount FAIL:",n)}const gU=1200,_U=performance.now();requestAnimationFrame(()=>{const n=performance.now()-_U,e=Math.max(0,gU-n);setTimeout(sb,e)});setTimeout(()=>{document.body.classList.contains("app-running")||(console.warn("[main.js] Splash fallback hide @ 5s — Vue mount mungkin stuck"),sb())},5e3);async function yU(){var n;try{const e=Date.now();for(;!window.Sentry&&Date.now()-e<3e3;)await new Promise(a=>setTimeout(a,100));if(!window.Sentry)return;const{db:t}=await ge(async()=>{const{db:a}=await Promise.resolve().then(()=>lF);return{db:a}},void 0),{doc:r,getDoc:i}=await ge(async()=>{const{doc:a,getDoc:c}=await Promise.resolve().then(()=>wV);return{doc:a,getDoc:c}},void 0),s=await i(r(t,"settings","general")),o=s.exists()&&((n=s.data())==null?void 0:n.sentryDsn)||"";if(!o)return;window.Sentry.init({dsn:o,tracesSampleRate:.1,release:"portal-mu@20.70.0526",environment:window.location.hostname.includes("localhost")?"dev":"prod"}),console.log("[main.js] Sentry initialized")}catch(e){console.warn("[main.js] Sentry init skipped:",e.message)}}yU();export{Vy as $,cr as A,$U as B,KU as C,hl as D,nf as E,an as F,tf as G,WI as H,HI as I,wp as J,QI as K,Va as L,Ep as M,En as N,Ss as O,ic as P,un as Q,f1 as R,MU as S,EU as T,TU as U,wU as V,GR as W,KR as X,uV as Y,dw as Z,ge as _,FS as a,lR as a0,uF as a1,qU as a2,Oy as a3,Gb as a4,Pe as a5,zU as a6,Hi as a7,wc as a8,FU as a9,OU as aa,ib as ab,GU as ac,jU as ad,KA as ae,fU as af,oP as ag,SU as ah,aP as ai,cP as aj,Vg as ak,RU as al,NS as am,Ms as an,vU as ao,Un as ap,ad as aq,IU as ar,CU as as,PU as at,pV as au,UU as b,Ar as c,Dt as d,yv as e,xa as f,ES as g,AU as h,bU as i,vS as j,qt as k,gt as l,KI as m,fw as n,LU as o,BU as p,fn as q,lF as r,Ja as s,Sn as t,xU as u,Ny as v,If as w,wV as x,ul as y,it as z};
