// Test Prep: test-shaped practice for each section of the Statement of Cash Flows.
// Each scenario shows the documents the test shows (income statement, comparative balance sheet, supplemental facts)
// and a blank section to build. Grading is per line with a plain reason, then a worked answer in statement layout.
import {esc,money} from './utils.js';

const H=n=>Math.round(n/100)*100;
function rng(seed){let s=(seed>>>0)||1;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
const pick=(r,arr)=>arr[Math.floor(r()*arr.length)];
const fmt=n=>n<0?`(${money(-n).replace('$','')})`:money(n).replace('$','');

const EFFECTS={operating:[['none','Not in Operating'],['add','Add (+)'],['subtract','Subtract (−)']],investing:[['none','Not in Investing'],['add','Inflow (+)'],['subtract','Outflow (−)']],financing:[['none','Not in Financing'],['add','Inflow (+)'],['subtract','Outflow (−)']]};
const TOTAL_LABEL={operating:'Net cash provided (used) by operating activities',investing:'Net cash provided (used) by investing activities',financing:'Net cash provided (used) by financing activities'};
export const LEVELS=[['1','Warm-up','a few lines, no gain or loss'],['2','Test-like','what tomorrow should feel like'],['3','A step harder','more accounts, a loss, more distractors']];

const COMPANIES=['Harbor Outfitters','Cedar Ridge Cycles','Summit Sporting Goods','Lakeview Coffee Roasters','Northbrook Print Co.','Maple Street Hardware'];

const CURRENT=[
 {id:'ar',label:'Accounts Receivable',group:'Current Assets',asset:true,why:(d)=>d>0?'Customers owe more: profit counted sales whose cash has not arrived, so subtract the increase.':'Customers paid down old IOUs: cash came in for sales counted earlier, so add the decrease.'},
 {id:'inv',label:'Inventory',group:'Current Assets',asset:true,why:(d)=>d>0?'More goods on the shelf: cash is tied up in things not yet counted as a cost, so subtract the increase.':'Less on the shelf: goods bought earlier were sold and expensed now, so add the decrease.'},
 {id:'prepaid',label:'Prepaid Expenses',group:'Current Assets',asset:true,why:(d)=>d>0?'Paid ahead for more: cash left before the cost was counted, so subtract the increase.':'Used up prepayments: the cost was counted now but the cash left earlier, so add the decrease.'},
 {id:'ap',label:'Accounts Payable',group:'Current Liabilities',asset:false,why:(d)=>d>0?'Owe suppliers more: costs were counted but not yet paid, so add the increase.':'Paid down the tab: cash left for costs counted earlier, so subtract the decrease.'},
 {id:'wages',label:'Wages Payable',group:'Current Liabilities',asset:false,why:(d)=>d>0?'Owe employees more: the expense was counted, the cash has not left, so add the increase.':'Paid off old wages owed: cash left with no new expense, so subtract the decrease.'},
 {id:'unearned',label:'Unearned Revenue',group:'Current Liabilities',asset:false,why:(d)=>d>0?'More customer cash collected ahead of the work: cash is ahead of profit, so add the increase.':'Did the work for cash collected earlier: profit counted it, no new cash, so subtract the decrease.'},
];

function operatingScenario(seed,level){
 const r=rng(seed*7919+level*31);const company=pick(r,COMPANIES);
 const nCur=level===1?3:level===2?4:6;const accts=[...CURRENT].sort(()=>r()-0.5).slice(0,nCur).sort((a,b)=>CURRENT.indexOf(a)-CURRENT.indexOf(b));
 const revenue=H(60000+r()*80000),dep=H(1500+r()*3500);
 const sale=level===1?null:{kind:level===3||r()<0.4?'loss':'gain',amount:H(300+r()*1200),book:H(2000+r()*6000)};
 let ni=H(revenue*(0.12+r()*0.1));
 const isRows=[{label:'Sales revenue',amount:revenue}];
 const opex=revenue-ni-dep+(sale?(sale.kind==='gain'?sale.amount:-sale.amount):0);
 isRows.push({label:'Operating expenses (excluding depreciation)',amount:-opex});
 isRows.push({label:'Depreciation expense',amount:-dep});
 if(sale)isRows.push({label:sale.kind==='gain'?'Gain on sale of equipment':'Loss on sale of equipment',amount:sale.kind==='gain'?sale.amount:-sale.amount});
 isRows.push({label:'Net income',amount:ni,total:true});
 const bs=[];const items=[];
 bs.push({id:'cash',label:'Cash',group:'Current Assets',begin:H(8000+r()*6000),end:H(9000+r()*9000)});
 for(const a of accts){const begin=H(2000+r()*9000);let d=H((200+r()*2600))*(r()<0.5?-1:1);if(begin+d<300)d=Math.abs(d);const end=begin+d;bs.push({id:a.id,label:a.label,group:a.group,begin,end});const effect=(a.asset?d>0:d<0)?'subtract':'add';items.push({id:a.id,line:`${d>0?'Increase':'Decrease'} in ${a.label}`,label:`Change in ${a.label}`,source:`${a.label}: ${fmt(begin)} → ${fmt(end)} (${d>0?'up':'down'} ${fmt(Math.abs(d))})`,correct:{effect,amount:Math.abs(d)},why:a.why(d)});}
 const eqB=H(30000+r()*30000),eqD=level>=2?H(2000+r()*6000):0;
 bs.push({id:'ppe',label:'Equipment, at cost',group:'Long-term Assets',begin:eqB,end:eqB+eqD});
 bs.push({id:'accum',label:'Accumulated depreciation',group:'Long-term Assets',begin:-H(8000+r()*6000),end:-H(10000+r()*8000)});
 const npB=H(10000+r()*10000);bs.push({id:'notes',label:'Notes Payable (long-term)',group:'Long-term Liabilities',begin:npB,end:npB+(level>=2?H(r()*8000):0)});
 bs.push({id:'stock',label:'Common Stock',group:'Stockholders’ Equity',begin:20000,end:level>=3?25000:20000});
 const supplemental=[];
 if(sale){const proceeds=sale.kind==='gain'?sale.book+sale.amount:sale.book-sale.amount;supplemental.push(`Sold equipment with a book value of ${money(sale.book)} for ${money(proceeds)} cash.`);}
 if(level>=2)supplemental.push(`Bought equipment for ${money(eqD)} cash.`);
 if(level>=3)supplemental.push('Issued common stock for $5,000 cash.');
 // items to classify, in a test-like order: income statement items first, then balance sheet accounts (including distractors)
 const list=[
  {id:'dep',label:'Depreciation expense',source:`Income statement: ${money(dep)}`,correct:{effect:'add',amount:dep},why:'Depreciation lowered net income but no cash left this year, so add it back.'},
 ];
 if(sale)list.push({id:'sale',label:sale.kind==='gain'?'Gain on sale of equipment':'Loss on sale of equipment',source:`Income statement: ${money(sale.amount)}`,correct:{effect:sale.kind==='gain'?'subtract':'add',amount:sale.amount},why:sale.kind==='gain'?'The gain raised net income, but the sale cash belongs in Investing. Subtract the gain so it is not counted twice.':'The loss lowered net income, but no operating cash left. Add it back; the sale cash belongs in Investing.'});
 list.push(...items);
 list.push({id:'cash_row',label:'Change in Cash',source:`Cash: ${fmt(bs[0].begin)} → ${fmt(bs[0].end)}`,correct:{effect:'none',amount:0},why:'Cash is what the whole statement explains. It is never a line inside any section.'});
 if(level>=2)list.push({id:'equip',label:'Purchase of equipment',source:`Equipment: ${fmt(eqB)} → ${fmt(eqB+eqD)}; supplemental says bought for cash`,correct:{effect:'none',amount:0},why:'Buying a long-term asset is Investing, not Operating.'});
 list.push({id:'accum_row',label:'Change in Accumulated depreciation',source:`Accumulated depreciation: ${fmt(bs.find(b=>b.id==='accum').begin)} → ${fmt(bs.find(b=>b.id==='accum').end)}`,correct:{effect:'none',amount:0},why:'Accumulated depreciation is a running total, not a cash flow. The depreciation expense line already handles this year’s charge.'});
 if(level>=2)list.push({id:'notes_row',label:'Change in Notes Payable (long-term)',source:`Notes Payable: ${fmt(npB)} → ${fmt(bs.find(b=>b.id==='notes').end)}`,correct:{effect:'none',amount:0},why:'Borrowing is Financing, not Operating.'});
 if(level>=3)list.push({id:'stock_row',label:'Issued common stock',source:'Supplemental: issued stock for $5,000 cash',correct:{effect:'none',amount:0},why:'Cash from owners is Financing, not Operating.'});
 const total=ni+list.reduce((n,x)=>n+(x.correct.effect==='add'?x.correct.amount:x.correct.effect==='subtract'?-x.correct.amount:0),0);
 return {section:'operating',company,level,seed,source:{company,period:'Year ended December 31',is:isRows,bs,supplemental},start:{label:'Net income',amount:ni},items:list,total};
}

function investingScenario(seed,level){
 const r=rng(seed*104729+level*17);const company=pick(r,COMPANIES);const list=[];const supplemental=[];
 const add=(label,source,effect,amount,why)=>{list.push({id:'i'+list.length,label,source,correct:{effect,amount},why});};
 const buy=H(10000+r()*30000);supplemental.push(`Bought equipment for ${money(buy)} cash.`);add('Purchase of equipment',`Supplemental: bought for ${money(buy)} cash`,'subtract',buy,'Cash paid for a long-term asset: Investing outflow.');
 const book=H(3000+r()*9000),isGain=r()<0.5,ga=H(200+r()*1500),proceeds=isGain?book+ga:book-ga;
 if(level===1){supplemental.push(`Sold an old truck for ${money(proceeds)} cash.`);add('Sale of truck',`Supplemental: sold for ${money(proceeds)} cash`,'add',proceeds,'Cash received for a long-term asset: Investing inflow. The amount is stated, so no calculation.');}
 else{supplemental.push(`Sold equipment with a book value of ${money(book)} at a ${money(ga)} ${isGain?'gain':'loss'}.`);add('Sale of equipment',`Supplemental: book value ${money(book)}, ${isGain?'gain':'loss'} ${money(ga)}`,'add',proceeds,`${isGain?'Gain':'Loss'} means the buyer paid ${isGain?'more':'less'} than book value: ${money(book)} ${isGain?'+':'−'} ${money(ga)} = ${money(proceeds)} cash in.`);}
 if(level>=2){const land=H(20000+r()*30000),landCash=H(land*0.3);supplemental.push(`Bought land for ${money(land)}, paying ${money(landCash)} cash and signing a note for the rest.`);add('Purchase of land',`Supplemental: ${money(land)} price, ${money(landCash)} cash`,'subtract',landCash,`Only the cash part is a cash flow: ${money(landCash)}. The note part is disclosed separately.`);}
 if(level>=3){supplemental.push('Bought a delivery van by signing a $24,000 note. No cash was paid.');add('Van acquired with a note','Supplemental: $24,000 note, no cash','none',0,'No cash moved, so it is not in any section. It goes in the separate noncash note.');}
 add('Depreciation expense',`Income statement: ${money(H(2000+r()*3000))}`,'none',0,'Depreciation belongs to the Operating reconciliation, not Investing.');
 add('Purchase of inventory',`Supplemental: bought ${money(H(5000+r()*8000))} of inventory`,'none',0,'Inventory is part of day-to-day operations, so it is Operating, not Investing.');
 if(level>=2)add('Borrowed on a bank loan',`Supplemental: borrowed ${money(H(10000+r()*20000))}`,'none',0,'Cash from a lender is Financing.');
 const total=list.reduce((n,x)=>n+(x.correct.effect==='add'?x.correct.amount:x.correct.effect==='subtract'?-x.correct.amount:0),0);
 return {section:'investing',company,level,seed,source:{company,period:'Year ended December 31',is:[],bs:[],supplemental},start:null,items:list.sort(()=>r()-0.5),total};
}

function financingScenario(seed,level){
 const r=rng(seed*7907+level*23);const company=pick(r,COMPANIES);const list=[];const supplemental=[];
 const add=(label,source,effect,amount,why)=>{list.push({id:'f'+list.length,label,source,correct:{effect,amount},why});};
 const loan=H(20000+r()*40000);supplemental.push(`Borrowed ${money(loan)} from the bank on a new note.`);add('Borrowed on note payable',`Supplemental: borrowed ${money(loan)}`,'add',loan,'Cash in from a lender: Financing inflow.');
 const stock=H(10000+r()*30000);supplemental.push(`Issued common stock for ${money(stock)} cash.`);add('Issued common stock',`Supplemental: ${money(stock)} cash from investors`,'add',stock,'Cash in from owners: Financing inflow.');
 const div=H(2000+r()*8000);
 if(level===1){supplemental.push(`Paid ${money(div)} of cash dividends.`);add('Paid dividends',`Supplemental: paid ${money(div)}`,'subtract',div,'Cash back to owners: Financing outflow.');}
 else{const reB=H(40000+r()*40000),ni=H(10000+r()*20000),reE=reB+ni-div;supplemental.push(`Retained Earnings was ${money(reB)} at the start of the year and ${money(reE)} at the end. Net income was ${money(ni)}. All dividends were paid in cash.`);add('Paid dividends',`Retained Earnings: ${money(reB)} + ${money(ni)} − dividends = ${money(reE)}`,'subtract',div,`Start + net income − dividends = end, so dividends = ${money(div)}. Cash back to owners: Financing outflow.`);}
 const princ=H(5000+r()*10000),interest=H(500+r()*1500);supplemental.push(`Paid the bank ${money(princ+interest)}: ${money(princ)} of principal and ${money(interest)} of interest.`);add('Repaid loan principal',`Supplemental: ${money(princ)} principal`,'subtract',princ,'Paying the lender back is Financing: only the principal part.');add('Interest paid',`Supplemental: ${money(interest)} interest`,'none',0,'Interest is the cost of borrowing. It is Operating, not Financing.');
 if(level>=3){supplemental.push('Bought equipment by signing a $15,000 note.');add('Equipment acquired with a note','Supplemental: $15,000 note, no cash','none',0,'No cash moved: not in any section. It goes in the separate noncash note.');}
 add('Sale of equipment',`Supplemental: sold old equipment for ${money(H(1000+r()*4000))} cash`,'none',0,'Selling a long-term asset is Investing, not Financing.');
 const total=list.reduce((n,x)=>n+(x.correct.effect==='add'?x.correct.amount:x.correct.effect==='subtract'?-x.correct.amount:0),0);
 return {section:'financing',company,level,seed,source:{company,period:'Year ended December 31',is:[],bs:[],supplemental},start:null,items:list.sort(()=>r()-0.5),total};
}

export function scenario(section,seed,level){return section==='operating'?operatingScenario(seed,level):section==='investing'?investingScenario(seed,level):financingScenario(seed,level);}

export function grade(sc,draft){
 const rows=sc.items.map(it=>{const d=draft[it.id]||{effect:'',amount:''};const amt=parseFloat(String(d.amount).replace(/[^0-9.]/g,''))||0;const effOK=d.effect===it.correct.effect;const amtOK=it.correct.effect==='none'?true:Math.abs(amt-it.correct.amount)<1;return {item:it,effect:d.effect,amount:amt,ok:effOK&&amtOK,effOK,amtOK};});
 const totalGiven=parseFloat(String(draft.__total||'').replace(/[^0-9.\-()]/g,'').replace(/\((.*)\)/,'-$1'))||0;
 const totalOK=Math.abs(totalGiven-sc.total)<1;
 const startOK=sc.start?Math.abs((parseFloat(String(draft.__start||'').replace(/[^0-9.]/g,''))||0)-sc.start.amount)<1:true;
 const max=rows.length+1+(sc.start?1:0),score=rows.filter(r=>r.ok).length+(totalOK?1:0)+(sc.start?(startOK?1:0):0);
 return {rows,totalGiven,totalOK,startOK,score,max};
}

export function answerStatementHTML(sc){
 const lines=[];if(sc.start)lines.push([sc.start.label,sc.start.amount]);
 for(const it of sc.items){if(it.correct.effect==='none')continue;lines.push([it.line||it.label,it.correct.effect==='add'?it.correct.amount:-it.correct.amount]);}
 return `<div class="statement-head"><strong>${esc(sc.company)}</strong><span>Statement of Cash Flows (partial)</span><span>Indirect method · ${esc(sc.source.period||'')}</span></div><div class="scf-section"><h3>Cash flows from ${sc.section} activities</h3>${lines.map(([l,a])=>`<div class="scf-line"><span>${esc(l)}</span><b>${fmt(a)}</b></div>`).join('')}<div class="scf-line total"><span>${TOTAL_LABEL[sc.section]}</span><b>${fmt(sc.total)}</b></div></div>`;
}
export function effectsFor(section){return EFFECTS[section];}
export function totalLabel(section){return TOTAL_LABEL[section];}
