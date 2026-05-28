import{w as s,L as i,h as l,g as b,V as g,E as h}from"./index-BXRe1o2Z.js";/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=({size:e,strokeWidth:r=2,absoluteStrokeWidth:t,color:o,iconNode:n,name:d,class:y,...u},{slots:c})=>s("svg",{...a,width:e||a.width,height:e||a.height,stroke:o||a.stroke,"stroke-width":t?Number(r)*24/Number(e):r,class:["lucide",`lucide-${m(d??"icon")}`],...u},[...n.map(v=>s(...v)),...c.default?[c.default()]:[]]);/**
 * @license lucide-vue-next v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(e,r)=>(t,{slots:o})=>s(f,{...t,iconNode:r,name:e},o),p=["type","disabled"],x={key:0,class:"inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-[var(--radius-full)] animate-spin"},C={__name:"UiButton",props:{variant:{type:String,default:"primary"},size:{type:String,default:"md"},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},type:{type:String,default:"button"}},setup(e){const r={primary:"bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--text-on-primary)] border border-[var(--color-primary)]",ghost:"bg-transparent hover:bg-[var(--bg-hover)] text-[var(--text-primary)] border border-[var(--border-default)]",accent:"bg-[var(--color-accent)] hover:bg-[var(--color-primary-hover)] text-[var(--text-on-accent)] border border-[var(--color-accent)]",danger:"bg-[var(--color-danger-soft)] hover:bg-[var(--color-danger)] hover:text-white text-[var(--color-danger-text)] border border-[var(--color-danger)]",success:"bg-[var(--color-success-soft)] hover:bg-[var(--color-success)] hover:text-white text-[var(--color-success-text)] border border-[var(--color-success)]"},t={sm:"px-3 py-1.5 text-xs",md:"px-4 py-2 text-sm",lg:"px-5 py-2.5 text-base"};return(o,n)=>(i(),l("button",{type:e.type,disabled:e.disabled||e.loading,class:h(["rounded-[var(--radius-md)] font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)]",[r[e.variant],t[e.size]]])},[e.loading?(i(),l("span",x)):b("",!0),g(o.$slots,"default")],10,p))}};export{C as _,k as c};
