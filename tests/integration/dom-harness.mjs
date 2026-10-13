import fs from 'node:fs';
import {parseHTML} from 'linkedom';
import {STORAGE_KEY} from '../../js/state.js';
let bootNumber=0;
export async function boot(initial=null, page='index.html', carry=null){
 const storage=carry||new Map();if(initial)storage.set(STORAGE_KEY,JSON.stringify(initial));
 const {window}=parseHTML(fs.readFileSync(new URL('../../'+page,import.meta.url),'utf8'));
 globalThis.window=window;globalThis.document=window.document;globalThis.location={hash:''};
 const local={getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)};globalThis.localStorage=local;
 window.CFL_CONFIG={appName:'Cash Flow Lab',blocks:[{id:'1',name:'Test class',code:'FLOW1'}],requireCode:false,terminology:{unearnedRevenue:'Unearned Revenue'},curriculum:{},practice:{focusSize:6,mixedSize:10,retryMinGap:3,retryMaxGap:7},mastery:{},assessment:{},firebase:null};
 window.scrollTo=()=>{};
 // linkedom models DOM trees, but does not implement the browser select-value setter.
 Object.defineProperty(window.HTMLSelectElement.prototype,'value',{configurable:true,get(){const o=this.querySelector('option[selected]')||this.querySelector('option');return o?.getAttribute('value')??o?.textContent??'';},set(value){for(const o of this.querySelectorAll('option')){if(o.getAttribute('value')===String(value))o.setAttribute('selected','');else o.removeAttribute('selected');}}});
 window.HTMLElement.prototype.scrollIntoView=function(){};
 Object.defineProperty(window.HTMLElement.prototype,'elements',{configurable:true,get(){const nodes=[...this.querySelectorAll('[name]')];for(const n of nodes)nodes[n.name||n.getAttribute('name')]=n;return nodes;}});
 globalThis.FormData=class {
  constructor(form){this.pairs=[];for(const n of form.querySelectorAll('input[name],select[name],textarea[name]')){if(n.disabled)continue;const type=n.getAttribute('type');if(['checkbox','radio'].includes(type)&&!n.checked&&!n.hasAttribute('checked'))continue;let value=n.value;if(n.tagName==='SELECT'){const option=n.querySelector('option[selected]')||n.querySelector('option');value=option?.getAttribute('value')??option?.textContent??'';}this.pairs.push([n.getAttribute('name'),String(value??'')]);}}
  get(k){return this.pairs.find(([key])=>key===k)?.[1]??null;}getAll(k){return this.pairs.filter(([key])=>key===k).map(([,v])=>v);}[Symbol.iterator](){return this.pairs[Symbol.iterator]();}
 };
 const dialog=window.document.querySelector('dialog');if(dialog){dialog.showModal=function(){this.open=true;};dialog.close=function(){this.open=false;};}
 const script=page==='teacher.html'?'teacher.js':page==='board.html'?'board.js':'main.js';
 await import(new URL(`../../js/${script}?dom-test=${++bootNumber}`,import.meta.url));
 const doc=window.document;
 const state=()=>JSON.parse(storage.get(STORAGE_KEY)||'null');
 const click=selector=>{const el=doc.querySelector(selector);if(!el)throw new Error('Missing click target '+selector+' at '+state()?.route);if(el.disabled)throw new Error('Disabled click target '+selector);el.dispatchEvent(new window.Event('click',{bubbles:true,cancelable:true}));};
 const field=(formSelector,name,value)=>{const form=doc.querySelector(formSelector);if(!form)throw new Error('Missing form '+formSelector);const el=form.querySelector(`[name="${name}"]`);if(!el)throw new Error('Missing field '+name);if(el.tagName==='SELECT'){for(const o of el.querySelectorAll('option')){o.removeAttribute('selected');if(o.getAttribute('value')===String(value))o.setAttribute('selected','');}}else el.value=String(value);el.dispatchEvent(new window.Event('input',{bubbles:true}));};
 const submit=selector=>{const form=doc.querySelector(selector);if(!form)throw new Error('Missing submit form '+selector);form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}));};
 const choose=(formSelector,values)=>{const form=doc.querySelector(formSelector),selected=Array.isArray(values)?values:[values];for(const n of form.querySelectorAll('[name="answer-choice"]')){const checked=selected.includes(n.getAttribute('value'));n.checked=checked;if(checked)n.setAttribute('checked','');else n.removeAttribute('checked');}form.dispatchEvent(new window.Event('input',{bubbles:true}));};
 const answer=(p,correct=p.correct,form='#answer-form')=>{if(p.type==='choice'||p.type==='multi')choose(form,correct);else if(p.type==='number')field(form,'amount',correct);else if(p.type==='direction_amount'){field(form,'direction',correct.direction);field(form,'amount',correct.amount);}else if(p.type==='place'){field(form,'section',correct.section);field(form,'sign',Math.sign(correct.amount));field(form,'amount',Math.abs(correct.amount));}submit(form);};
 return {doc,window,storage,state,click,field,submit,choose,answer};
}
