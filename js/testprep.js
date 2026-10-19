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

function shuffle(r,arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const CURRENT=[
 {id:'ar',label:'Accounts Receivable',group:'ca',asset:true,module:'accounts_receivable',concept:'accounts_receivable',why:(d)=>d>0?'Customers owe more at year-end: cash collected from customers was less than the sales counted in net income, by this amount. Subtract the increase.':'Customers owe less at year-end: cash collected was more than the sales counted in net income, by this amount. Add the decrease.'},
 {id:'inv',label:'Inventory',group:'ca',asset:true,module:'inventory',concept:'inventory',why:(d)=>d>0?'More inventory on hand: purchases were larger than cost of goods sold, by this amount. Subtract the increase. (If some purchases were on credit, the Accounts Payable change handles that part.)':'Less inventory on hand: cost of goods sold was larger than purchases, by this amount. Add the decrease.'},
 {id:'prepaid',label:'Prepaid Expenses',group:'ca',asset:true,module:'prepaid_expenses',concept:'prepaid_expenses',why:(d)=>d>0?'Paid ahead for more: cash paid was larger than the expense counted, by this amount. Subtract the increase.':'Used up prepaid amounts: the expense counted was larger than the cash paid this year, by this amount. Add the decrease.'},
 {id:'ap',label:'Accounts Payable',group:'cl',asset:false,module:'accounts_payable',concept:'accounts_payable',why:(d)=>d>0?'Owe suppliers more at year-end: cash paid to suppliers was less than the purchases and costs recorded, by this amount. Add the increase.':'Owe suppliers less at year-end: cash paid to suppliers was more than the purchases and costs recorded, by this amount. Subtract the decrease.'},
 {id:'wages',label:'Wages Payable',group:'cl',asset:false,module:'accrued_liabilities',concept:'accrued_liabilities',why:(d)=>d>0?'Owe employees more: wage expense counted was larger than the cash paid, by this amount. Add the increase.':'Owe employees less: cash paid was larger than the wage expense counted, by this amount. Subtract the decrease.'},
 {id:'unearned',label:'Unearned Revenue',group:'cl',asset:false,module:'unearned_revenue',concept:'unearned_revenue',why:(d)=>d>0?'Customers paid ahead: cash collected was larger than the revenue counted, by this amount. Add the increase.':'Delivered on earlier deposits: revenue counted was larger than the cash collected, by this amount. Subtract the decrease.'},
];

// opts: {force:'gain'|'loss', accounts:[ids], blank:true}
function operatingScenario(seed,level,opts={}){
 const r=rng(seed*7919+level*31);const company=pick(r,COMPANIES);
 const nCur=level===1?3:level===2?4:6;
 const accts=opts.accounts?CURRENT.filter(a=>opts.accounts.includes(a.id)):shuffle(r,CURRENT).slice(0,nCur).sort((a,b)=>CURRENT.indexOf(a)-CURRENT.indexOf(b));
 // --- income statement (multi-step, like the test) ---
 const revenue=H(60000+r()*80000),cogs=H(revenue*0.58),gross=revenue-cogs,dep=H(1500+r()*3500);
 const saleKind=level===1?null:opts.force==='gain'?'gain':opts.force==='loss'?'loss':(level===3||r()<0.4?'loss':'gain');
 const sale=saleKind?{kind:saleKind,amount:H(300+r()*1200),book:H(2000+r()*6000)}:null;
 const ni=H(revenue*(0.08+r()*0.07)),tax=H(ni*0.3),ibt=ni+tax,iop=ibt-(sale?(sale.kind==='gain'?sale.amount:-sale.amount):0),opex=gross-iop;
 const wages=H((opex-dep)*0.6),rent=H((opex-dep)*0.2),other=opex-dep-wages-rent;
 const isRows=[['Sales revenue',revenue],['Cost of goods sold',-cogs],['Gross profit',gross,'sub'],['Operating expenses:',null,'head'],['Wages expense',-wages,'in'],['Rent expense',-rent,'in'],['Depreciation expense',-dep,'in'],['Other operating expenses',-other,'in'],['Total operating expenses',-opex,'sub'],['Income from operations',iop,'sub']];
 if(sale)isRows.push([sale.kind==='gain'?'Gain on sale of equipment':'Loss on sale of equipment',sale.kind==='gain'?sale.amount:-sale.amount]);
 isRows.push(['Income before income taxes',ibt,'sub'],['Income tax expense',-tax],['Net income',ni,'total']);
 // --- events that move cash outside operations ---
 const soldCost=sale?sale.book+H(1000+r()*5000):0,soldAccum=sale?soldCost-sale.book:0;
 const proceeds=sale?(sale.kind==='gain'?sale.book+sale.amount:sale.book-sale.amount):0;
 const eqD=level>=2?H(2000+r()*6000):0,borrow=level>=2?H(1000+r()*7000):0,div=level>=2?H(500+r()*2500):0,stockIssue=level>=3?5000:0;
 // --- current operating accounts ---
 const cur=[];const items=[];
 for(const a of accts){const begin=H(2000+r()*9000);let d=H(200+r()*2600)*(r()<0.5?-1:1);if(begin+d<300)d=Math.abs(d);const end=begin+d;cur.push({id:a.id,label:a.label,group:a.group,begin,end});const effect=(a.asset?d>0:d<0)?'subtract':'add';items.push({id:a.id,module:a.module,concept:a.concept,line:`${d>0?'Increase':'Decrease'} in ${a.label}`,label:`Change in ${a.label}`,source:`${a.label}: ${fmt(begin)} → ${fmt(end)} (${d>0?'up':'down'} ${fmt(Math.abs(d))})`,correct:{effect,amount:Math.abs(d)},why:a.why(d)});}
 const adjSum=items.reduce((n,x)=>n+(x.correct.effect==='add'?x.correct.amount:-x.correct.amount),0);
 const total=ni+dep+(sale?(sale.kind==='gain'?-sale.amount:sale.amount):0)+adjSum;
 // --- long-term accounts rolled forward from the events ---
 const eqB=H(30000+r()*30000),eqE=eqB+eqD-soldCost;
 const adB=H(8000+r()*6000),adE=adB+dep-soldAccum;
 const npB=H(10000+r()*10000),npE=npB+borrow;
 const stB=20000,stE=stB+stockIssue;
 // --- cash from the full reconciliation; retained earnings plugs the opening balance sheet ---
 let cashB=H(8000+r()*6000);const dCash=total+(proceeds-eqD)+(borrow-div+stockIssue);
 const caB=cur.filter(c=>c.group==='ca').reduce((n,c)=>n+c.begin,0),clB=cur.filter(c=>c.group==='cl').reduce((n,c)=>n+c.begin,0);
 let reB=cashB+caB+eqB-adB-clB-npB-stB;
 if(reB<5000){cashB+=5000-reB;reB=5000;}
 if(cashB+dCash<1000)cashB+=1000-(cashB+dCash);
 const cashE=cashB+dCash,reE=reB+ni-div;
 const row=(id,label,begin,end)=>({id,label,begin,end});
 const bs={ca:[row('cash','Cash',cashB,cashE),...cur.filter(c=>c.group==='ca')],lt:[row('ppe','Equipment',eqB,eqE),row('accum','Less: Accumulated depreciation',-adB,-adE)],cl:cur.filter(c=>c.group==='cl'),ltl:[row('notes','Notes payable (long-term)',npB,npE)],eq:[row('stock','Common stock',stB,stE),row('re','Retained earnings',reB,reE)]};
 bs.totalAssets=[cashB+caB+eqB-adB,cashE+cur.filter(c=>c.group==='ca').reduce((n,c)=>n+c.end,0)+eqE-adE];
 bs.totalLE=[clB+npB+stB+reB,cur.filter(c=>c.group==='cl').reduce((n,c)=>n+c.end,0)+npE+stE+reE];
 const supplemental=[];
 if(sale)supplemental.push(`Equipment that originally cost ${money(soldCost)} and had accumulated depreciation of ${money(soldAccum)} was sold for ${money(proceeds)} cash.`);
 if(level>=2)supplemental.push(`New equipment was purchased for ${money(eqD)} cash.`);
 if(level>=2)supplemental.push(`The company borrowed ${money(borrow)} on a long-term note payable.`);
 if(level>=2)supplemental.push(`Cash dividends of ${money(div)} were paid.`);
 if(level>=3)supplemental.push('Common stock was issued for $5,000 cash.');
 // --- items to classify: income statement items, then the balance sheet in its own order ---
 const list=[{id:'dep',module:'depreciation',concept:'depreciation',label:'Depreciation expense',source:`Income statement: ${money(dep)}`,correct:{effect:'add',amount:dep},why:'Recording depreciation reduced net income without using any cash. Add it back. Any cash paid to buy equipment is reported in Investing, not here.'}];
 if(sale)list.push({id:'sale',module:'gain_on_sale',concept:sale.kind==='gain'?'gain_on_sale':'loss_on_sale',label:sale.kind==='gain'?'Gain on sale of equipment':'Loss on sale of equipment',source:`Income statement: ${money(sale.amount)}`,correct:{effect:sale.kind==='gain'?'subtract':'add',amount:sale.amount},why:sale.kind==='gain'?'The gain raised net income, but it is not cash from operations. The whole sale price is reported in Investing, so subtract the gain here so it is not counted twice.':'The loss lowered net income, but no operating cash left because of it. Add it back; the sale price is reported in Investing.'});
 list.push(...items);
 list.push({id:'cash_row',module:'cash_change',label:'Change in Cash',source:`Cash: ${fmt(cashB)} → ${fmt(cashE)}`,correct:{effect:'none',amount:0},why:'Cash is what the whole statement explains. It is never a line inside a section.'});
 if(level>=2)list.push({id:'equip',module:'ppe_purchase',concept:'ppe_purchase',label:'Change in Equipment (at cost)',source:`Equipment: ${fmt(eqB)} → ${fmt(eqE)}`,correct:{effect:'none',amount:0},why:'Equipment at cost goes up with purchases and down by the original cost of equipment sold. The cash purchase belongs in Investing, and the sale is handled through the gain or loss line and Investing.'});
 list.push({id:'accum_row',module:'depreciation',concept:'depreciation',label:'Change in Accumulated depreciation',source:`Accumulated depreciation: ${fmt(adB)} → ${fmt(adE)}`,correct:{effect:'none',amount:0},why:'Accumulated depreciation rises with this year’s depreciation and falls when sold equipment is removed. The depreciation expense line already handles this year’s charge; do not add the balance change too.'});
 if(level>=2)list.push({id:'notes_row',module:'borrowing',concept:'borrowing',label:'Change in Notes Payable (long-term)',source:`Notes payable: ${fmt(npB)} → ${fmt(npE)}`,correct:{effect:'none',amount:0},why:'Borrowing is Financing, not Operating.'});
 if(level>=3)list.push({id:'stock_row',module:'borrowing',concept:'stock_issuance',label:'Issued common stock',source:'Additional information: issued stock for $5,000 cash',correct:{effect:'none',amount:0},why:'Cash from owners is Financing, not Operating.'});
 if(level>=2)list.push({id:'re_row',module:'borrowing',concept:'dividends',label:'Change in Retained Earnings',source:`Retained earnings: ${fmt(reB)} → ${fmt(reE)}`,correct:{effect:'none',amount:0},why:'Retained earnings rises with net income and falls with dividends. It is not a cash line: net income is already the starting point, and dividends are Financing.'});
 if(level>=2)list.push({id:'div_row',module:'borrowing',concept:'dividends',label:'Cash dividends paid',source:`Additional information: paid ${money(div)}`,correct:{effect:'none',amount:0},why:'Cash paid to owners is Financing, not Operating.'});
 const ORDER=['dep','sale','cash_row','ar','inv','prepaid','equip','accum_row','ap','wages','unearned','notes_row','stock_row','re_row','div_row'];
 list.sort((x,y)=>ORDER.indexOf(x.id)-ORDER.indexOf(y.id));
 return {section:'operating',company,level,seed,opts,source:{company,period:'Year ended December 31, 2026',paperIS:isRows,paperBS:bs,supplemental,paperStyle:true,is:[],bs:[]},start:{label:'Net income',amount:ni},items:list,total,blank:!!opts.blank,
  check:{dCash,investing:proceeds-eqD,financing:borrow-div+stockIssue,eqRoll:[eqB,eqD,soldCost,eqE],adRoll:[adB,dep,soldAccum,adE],reRoll:[reB,ni,div,reE]}};
}

function investingScenario(seed,level){
 const r=rng(seed*104729+level*17);const company=pick(r,COMPANIES);const list=[];const supplemental=[];
 const LINK={'Purchase of equipment':['ppe_purchase','ppe_purchase'],'Sale of truck':['ppe_purchase','ppe_sale'],'Sale of equipment':['gain_on_sale','ppe_sale'],'Purchase of land':['ppe_purchase','ppe_purchase'],'Van acquired with a note':['noncash_investing_financing','noncash_investing_financing'],'Depreciation expense':['depreciation','depreciation'],'Purchase of inventory':['inventory','inventory'],'Borrowed on a bank loan':['borrowing','borrowing']};const add=(label,source,effect,amount,why)=>{const [module,concept]=LINK[label]||[];list.push({id:'i'+list.length,module,concept,label,source,correct:{effect,amount},why});};
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
 return {section:'investing',company,level,seed,source:{company,period:'Year ended December 31',is:[],bs:[],supplemental},start:null,items:shuffle(r,list),total};
}

function financingScenario(seed,level){
 const r=rng(seed*7907+level*23);const company=pick(r,COMPANIES);const list=[];const supplemental=[];
 const LINK={'Borrowed on note payable':['borrowing','borrowing'],'Issued common stock':['borrowing','stock_issuance'],'Paid dividends':['borrowing','dividends'],'Repaid loan principal':['borrowing','debt_repayment'],'Interest paid':['borrowing','debt_repayment'],'Equipment acquired with a note':['noncash_investing_financing','noncash_investing_financing'],'Sale of equipment':['ppe_purchase','ppe_sale']};const add=(label,source,effect,amount,why)=>{const [module,concept]=LINK[label]||[];list.push({id:'f'+list.length,module,concept,label,source,correct:{effect,amount},why});};
 const loan=H(20000+r()*40000);supplemental.push(`Borrowed ${money(loan)} from the bank on a new note.`);add('Borrowed on note payable',`Supplemental: borrowed ${money(loan)}`,'add',loan,'Cash in from a lender: Financing inflow.');
 const stock=H(10000+r()*30000);supplemental.push(`Issued common stock for ${money(stock)} cash.`);add('Issued common stock',`Supplemental: ${money(stock)} cash from investors`,'add',stock,'Cash in from owners: Financing inflow.');
 const div=H(2000+r()*8000);
 if(level===1){supplemental.push(`Paid ${money(div)} of cash dividends.`);add('Paid dividends',`Supplemental: paid ${money(div)}`,'subtract',div,'Cash back to owners: Financing outflow.');}
 else{const reB=H(40000+r()*40000),ni=H(10000+r()*20000),reE=reB+ni-div;supplemental.push(`Retained Earnings was ${money(reB)} at the start of the year and ${money(reE)} at the end. Net income was ${money(ni)}. All dividends were paid in cash.`);add('Paid dividends',`Retained Earnings: ${money(reB)} + ${money(ni)} − dividends = ${money(reE)}`,'subtract',div,`Start + net income − dividends = end, so dividends = ${money(div)}. Cash back to owners: Financing outflow.`);}
 const princ=H(5000+r()*10000),interest=H(500+r()*1500);supplemental.push(`Paid the bank ${money(princ+interest)}: ${money(princ)} of principal and ${money(interest)} of interest.`);add('Repaid loan principal',`Supplemental: ${money(princ)} principal`,'subtract',princ,'Paying the lender back is Financing: only the principal part.');add('Interest paid',`Supplemental: ${money(interest)} interest`,'none',0,'Interest is the cost of borrowing. It is Operating, not Financing.');
 if(level>=3){supplemental.push('Bought equipment by signing a $15,000 note.');add('Equipment acquired with a note','Supplemental: $15,000 note, no cash','none',0,'No cash moved: not in any section. It goes in the separate noncash note.');}
 add('Sale of equipment',`Supplemental: sold old equipment for ${money(H(1000+r()*4000))} cash`,'none',0,'Selling a long-term asset is Investing, not Financing.');
 const total=list.reduce((n,x)=>n+(x.correct.effect==='add'?x.correct.amount:x.correct.effect==='subtract'?-x.correct.amount:0),0);
 return {section:'financing',company,level,seed,source:{company,period:'Year ended December 31',is:[],bs:[],supplemental},start:null,items:shuffle(r,list),total};
}

export function scenario(section,seed,level,opts={}){return section==='operating'?operatingScenario(seed,level,opts):section==='investing'?investingScenario(seed,level):financingScenario(seed,level);}

function parseAmt(v){return parseFloat(String(v??'').replace(/[^0-9.]/g,''))||0;}
function parseSigned(v){const s=String(v??'').trim();const neg=/^\(.*\)$/.test(s)||/^-/.test(s);const n=parseAmt(s);return neg?-n:n;}
export function grade(sc,draft){
 if(sc.blank)return gradeBlank(sc,draft);
 const rows=sc.items.map(it=>{const d=draft[it.id]||{effect:'',amount:''};const amt=parseAmt(d.amount);const effOK=d.effect===it.correct.effect;const amtOK=it.correct.effect==='none'?true:Math.abs(amt-it.correct.amount)<1;return {item:it,effect:d.effect,amount:amt,ok:effOK&&amtOK,effOK,amtOK};});
 const startGiven=sc.start?parseAmt(draft.__start):0;const startOK=sc.start?Math.abs(startGiven-sc.start.amount)<1:true;
 const own=startGiven+rows.reduce((n,r)=>n+(r.effect==='add'?r.amount:r.effect==='subtract'?-r.amount:0),0);
 const totalGiven=parseSigned(draft.__total);const totalKey=Math.abs(totalGiven-sc.total)<1;const totalConsistent=Math.abs(totalGiven-own)<1;
 const totalOK=totalKey||totalConsistent;
 const max=rows.length+1+(sc.start?1:0),score=rows.filter(r=>r.ok).length+(totalOK?1:0)+(sc.start?(startOK?1:0):0);
 return {rows,totalGiven,totalOK,totalKey,totalConsistent,own,startOK,score,max};
}
// Blank-form mode: the student fills slots (label + direction + amount) with no labels supplied, like the paper test.
function gradeBlank(sc,draft){
 const slots=(draft.__slots||[]).map((s,i)=>({i,label:s?.label||'',effect:s?.effect||'',amount:parseAmt(s?.amount)})).filter(s=>s.label||s.effect||s.amount);
 const required=sc.items.filter(it=>it.correct.effect!=='none');
 const used=new Set();
 const rows=required.map(it=>{const s=slots.find(s=>!used.has(s.i)&&s.label===it.label);if(!s)return {item:it,ok:false,missing:true,effOK:false,amtOK:false,effect:'',amount:0};used.add(s.i);const effOK=s.effect===it.correct.effect,amtOK=Math.abs(s.amount-it.correct.amount)<1;return {item:it,ok:effOK&&amtOK,effOK,amtOK,effect:s.effect,amount:s.amount,slot:s.i};});
 const extras=slots.filter(s=>!used.has(s.i)).map(s=>{const it=sc.items.find(it=>it.label===s.label);return {i:s.i,label:s.label||'(no account chosen)',effect:s.effect,amount:s.amount,why:it?it.why:'This account was already used, or no account was chosen.',item:it||null};});
 const startGiven=parseAmt(draft.__start);const startOK=Math.abs(startGiven-sc.start.amount)<1;
 const own=startGiven+slots.reduce((n,s)=>n+(s.effect==='add'?s.amount:s.effect==='subtract'?-s.amount:0),0);
 const totalGiven=parseSigned(draft.__total);const totalKey=Math.abs(totalGiven-sc.total)<1;const totalConsistent=Math.abs(totalGiven-own)<1;const totalOK=totalKey||totalConsistent;
 const lineScore=Math.max(0,rows.filter(r=>r.ok).length-extras.length);
 const max=required.length+2,score=lineScore+(startOK?1:0)+(totalOK?1:0);
 return {rows,extras,totalGiven,totalOK,totalKey,totalConsistent,own,startOK,score,max,blank:true};
}

export function answerStatementHTML(sc){
 const lines=[];if(sc.start)lines.push([sc.start.label,sc.start.amount]);
 for(const it of sc.items){if(it.correct.effect==='none')continue;lines.push([it.line||it.label,it.correct.effect==='add'?it.correct.amount:-it.correct.amount]);}
 return `<div class="statement-head"><strong>${esc(sc.company)}</strong><span>Statement of Cash Flows (partial)</span><span>Indirect method · ${esc(sc.source.period||'')}</span></div><div class="scf-section"><h3>Cash flows from ${sc.section} activities</h3>${lines.map(([l,a])=>`<div class="scf-line"><span>${esc(l)}</span><b>${fmt(a)}</b></div>`).join('')}<div class="scf-line total"><span>${TOTAL_LABEL[sc.section]}</span><b>${fmt(sc.total)}</b></div></div>`;
}
export function effectsFor(section){return EFFECTS[section];}
export function totalLabel(section){return TOTAL_LABEL[section];}

export const PROCEDURE={
 operating:['Write net income first, from the bottom line of the income statement.','Add depreciation expense. Recording it reduced net income, but no cash was used.','Remove the equipment-sale result: subtract a gain, add back a loss. The full cash price of the sale belongs in Investing.','Operating current assets other than Cash (Accounts Receivable, Inventory, Prepaid Expenses): went up → subtract the change; went down → add it.','Operating current liabilities (Accounts Payable, Wages Payable, Unearned Revenue): went up → add the change; went down → subtract it.','Do not add or subtract the changes in Cash, Equipment, Accumulated depreciation, Notes payable, Common stock, or Retained earnings. Depreciation and the sale are already handled above; purchases, borrowing, stock, and dividends belong in Investing or Financing.','Add the signed amounts. Parentheses on an adjustment mean “subtract from net income,” not necessarily a cash payment. A negative total means net cash used by operating activities.'],
 investing:['Only long-term assets: equipment, land, buildings, investments. Not inventory, not depreciation.','Cash paid to buy one → outflow. Cash received from selling one → inflow.','If the cash is stated, use it and stop. If the problem gives book value and a gain or loss instead: gain → paid more than book value; loss → paid less.','If part of the price was a note, only the cash part is a cash flow. The note part is disclosed separately.','No cash moved at all (equipment for a note)? Not in any section.','Add the column. Label the total "Net cash provided (used) by investing activities."'],
 financing:['Only lenders and owners: borrow, repay principal, issue stock, pay dividends, buy back shares.','Cash in from them → inflow. Cash back to them → outflow.','A loan payment: only the principal part is Financing. Interest is Operating.','Dividends hidden in Retained Earnings: start + net income − dividends = end.','No cash moved (stock or a note given for equipment)? Not in any section.','Add the column. Label the total "Net cash provided (used) by financing activities."'],
};

// Documents laid out the way the paper test lays them out: multi-step income statement; balance sheet with This year | Last year.
export function paperDocsHTML(sc){
 const s=sc.source;if(!s.paperStyle)return '';
 const line=([label,amt,kind])=>`<div class="pl ${kind||''}"><span>${esc(label)}</span><b>${amt==null?'':fmt(amt)}</b></div>`;
 const is=`<div class="statement paper"><div class="statement-head"><strong>${esc(s.company)}</strong><span>Income Statement</span><span>For the ${esc(s.period)}</span></div>${s.paperIS.map(line).join('')}</div>`;
 const row=(r)=>`<div class="pl3"><span>${esc(r.label)}</span><b>${fmt(r.end)}</b><b>${fmt(r.begin)}</b></div>`;
 const bs=`<div class="statement paper"><div class="statement-head"><strong>${esc(s.company)}</strong><span>Comparative Balance Sheets</span><span>December 31, 2026 and 2025</span></div><div class="pl3 head"><span></span><b>2026</b><b>2025</b></div><div class="pl3 sec"><span>Assets</span><b></b><b></b></div><div class="pl3 sub"><span>Current assets:</span><b></b><b></b></div>${s.paperBS.ca.map(row).join('')}${s.paperBS.lt.map(row).join('')}<div class="pl3 total"><span>Total assets</span><b>${fmt(s.paperBS.totalAssets[1])}</b><b>${fmt(s.paperBS.totalAssets[0])}</b></div><div class="pl3 sec"><span>Liabilities and Stockholders’ Equity</span><b></b><b></b></div><div class="pl3 sub"><span>Current liabilities:</span><b></b><b></b></div>${s.paperBS.cl.map(row).join('')}${s.paperBS.ltl.map(row).join('')}${s.paperBS.eq.map(row).join('')}<div class="pl3 total"><span>Total liabilities and stockholders’ equity</span><b>${fmt(s.paperBS.totalLE[1])}</b><b>${fmt(s.paperBS.totalLE[0])}</b></div><div class="small muted" style="margin-top:6px">Columns are this year (2026) then last year (2025). A change is this year minus last year.</div></div>`;
 const supp=`<div class="statement paper"><div class="statement-head"><strong>${esc(s.company)}</strong><span>Additional information for 2026</span><span></span></div><ol class="supp">${s.supplemental.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`;
 return is+bs+supp;
}
