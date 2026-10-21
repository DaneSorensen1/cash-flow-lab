export const VERSION = '1.9.1';
export const CONTENT_VERSION = '2026.10.15.1';
export const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const money = n => n < 0 ? `($${Math.abs(n).toLocaleString('en-US')})` : `$${n.toLocaleString('en-US')}`;
export const signed = n => `${n < 0 ? 'Subtract' : 'Add'} ${money(Math.abs(n))}`;
export const sum = a => a.reduce((s,n)=>s+n,0);
export const id = () => globalThis.crypto?.randomUUID?.() || `cfl-${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function rng(seed) { let a=Number(seed)>>>0; return ()=>{ a+=0x6D2B79F5; let t=a; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
export function shuffle(items, seed) { const r=rng(seed), a=[...items]; for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a; }
export function parseAmount(value) { const s=String(value??'').trim(); if(!s)return null; if(!/^\(?-?\$?\d[\d,]*(\.\d{1,2})?\)?$/.test(s))return null; const n=Number(s.replace(/[$,()]/g,'')); return Number.isFinite(n)?(s.startsWith('(')?-Math.abs(n):n):null; }
export function download(name, content, type='application/json') { const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000); }
export function csv(rows) {return rows.map(row=>row.map(x=>{let v=String(x??'');if(/^[=+@\-\t\r]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"';}).join(',')).join('\r\n');}
export const pct = n => n==null?'—':`${Math.round(n*100)}%`;
