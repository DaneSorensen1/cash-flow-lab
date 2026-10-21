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
 {id:'ar',label:'Accounts Receivable',group:'ca',asset:true,module:'accounts_receivable',concept:'accounts_receivable',why:(d)=>d>0?`Net income counts a sale when it is made. Cash counts it when the customer pays. Accounts Receivable went up by ${money(d)}: customers paid ${money(d)} less than the sales net income counted. Subtract ${money(d)}.`:`Net income counts a sale when it is made. Cash counts it when the customer pays. Accounts Receivable went down by ${money(-d)}: customers paid ${money(-d)} more than this year’s sales (old bills were paid). Add ${money(-d)}.`},
 {id:'inv',label:'Inventory',group:'ca',asset:true,module:'inventory',concept:'inventory',why:(d)=>d>0?`Net income counts inventory as a cost only when it is sold. Cash goes out when it is bought. Inventory went up by ${money(d)}: ${money(d)} more was bought than was counted as cost of goods sold. Subtract ${money(d)}. (If part was bought on credit, the Accounts Payable line handles that part.)`:`Net income counts inventory as a cost only when it is sold. Cash goes out when it is bought. Inventory went down by ${money(-d)}: ${money(-d)} more was counted as cost of goods sold than was bought. Add ${money(-d)}.`},
 {id:'prepaid',label:'Prepaid Expenses',group:'ca',asset:true,module:'prepaid_expenses',concept:'prepaid_expenses',why:(d)=>d>0?`Net income counts rent or insurance as an expense in the period it covers. Cash counts it when it is paid. Prepaid Expenses went up by ${money(d)}: ${money(d)} more cash was paid than expense counted. Subtract ${money(d)}.`:`Net income counts rent or insurance as an expense in the period it covers. Cash counts it when it is paid. Prepaid Expenses went down by ${money(-d)}: ${money(-d)} more expense was counted than cash paid this year. Add ${money(-d)}.`},
 {id:'ap',label:'Accounts Payable',group:'cl',asset:false,module:'accounts_payable',concept:'accounts_payable',why:(d)=>d>0?`Net income counts a cost when it happens. Cash counts it when the supplier is paid. Accounts Payable went up by ${money(d)}: ${money(d)} of costs were counted but not yet paid. Add ${money(d)}.`:`Net income counts a cost when it happens. Cash counts it when the supplier is paid. Accounts Payable went down by ${money(-d)}: ${money(-d)} more was paid to suppliers than the costs counted this year (old bills were paid). Subtract ${money(-d)}.`},
 {id:'wages',label:'Wages Payable',group:'cl',asset:false,module:'accrued_liabilities',concept:'accrued_liabilities',why:(d)=>d>0?`Net income counts wages when employees do the work. Cash counts them on payday. Wages Payable went up by ${money(d)}: ${money(d)} of wages were counted but not yet paid. Add ${money(d)}.`:`Net income counts wages when employees do the work. Cash counts them on payday. Wages Payable went down by ${money(-d)}: ${money(-d)} more was paid than the wages counted this year. Subtract ${money(-d)}.`},
 {id:'unearned',label:'Unearned Revenue',group:'cl',asset:false,module:'unearned_revenue',concept:'unearned_revenue',why:(d)=>d>0?`Net income counts revenue when the work is done. Cash counts it when the customer pays. Unearned Revenue went up by ${money(d)}: customers paid ${money(d)} that has not been counted as revenue yet. Add ${money(d)}.`:`Net income counts revenue when the work is done. Cash counts it when the customer pays. Unearned Revenue went down by ${money(-d)}: ${money(-d)} of revenue was counted for cash that came in earlier. Subtract ${money(-d)}.`},
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
 const list=[{id:'dep',module:'depreciation',concept:'depreciation',label:'Depreciation expense',source:`Income statement: ${money(dep)}`,correct:{effect:'add',amount:dep},why:`Net income counts ${money(dep)} of depreciation as an expense. No cash leaves for it (the cash left when the equipment was bought, and that purchase is reported in Investing). Add back ${money(dep)}.`}];
 if(sale)list.push({id:'sale',module:'gain_on_sale',concept:sale.kind==='gain'?'gain_on_sale':'loss_on_sale',label:sale.kind==='gain'?'Gain on sale of equipment':'Loss on sale of equipment',source:`Income statement: ${money(sale.amount)}`,correct:{effect:sale.kind==='gain'?'subtract':'add',amount:sale.amount},why:sale.kind==='gain'?`Net income counts the ${money(sale.amount)} gain. The cash from the sale is reported in Investing, not here. Subtract ${money(sale.amount)} so it is not counted twice.`:`Net income counts the ${money(sale.amount)} loss. No operating cash left for it; the cash from the sale is reported in Investing. Add back ${money(sale.amount)}.`});
 list.push(...items);
 list.push({id:'cash_row',module:'cash_change',label:'Change in Cash',source:`Cash: ${fmt(cashB)} → ${fmt(cashE)}`,correct:{effect:'none',amount:0},why:'Operating + Investing + Financing = the change in Cash. The change in Cash is the answer, not a line. Leave it out.'});
 if(level>=2)list.push({id:'equip',module:'ppe_purchase',concept:'ppe_purchase',label:'Change in Equipment (at cost)',source:`Equipment: ${fmt(eqB)} → ${fmt(eqE)}`,correct:{effect:'none',amount:0},why:'Buying and selling equipment is Investing. Leave it out of Operating. (The gain or loss line above already handles the sale’s effect on net income.)'});
 list.push({id:'accum_row',module:'depreciation',concept:'depreciation',label:'Change in Accumulated depreciation',source:`Accumulated depreciation: ${fmt(adB)} → ${fmt(adE)}`,correct:{effect:'none',amount:0},why:'The depreciation expense line already handles this. Leave the balance change out.'});
 if(level>=2)list.push({id:'notes_row',module:'borrowing',concept:'borrowing',label:'Change in Notes Payable (long-term)',source:`Notes payable: ${fmt(npB)} → ${fmt(npE)}`,correct:{effect:'none',amount:0},why:'Borrowing is Financing. Leave it out.'});
 if(level>=3)list.push({id:'stock_row',module:'borrowing',concept:'stock_issuance',label:'Issued common stock',source:'Additional information: issued stock for $5,000 cash',correct:{effect:'none',amount:0},why:'Cash from owners is Financing. Leave it out.'});
 if(level>=2)list.push({id:'re_row',module:'borrowing',concept:'dividends',label:'Change in Retained Earnings',source:`Retained earnings: ${fmt(reB)} → ${fmt(reE)}`,correct:{effect:'none',amount:0},why:'Retained earnings is past profit kept in the company. It changes with net income (already your first line) and dividends (Financing). Leave it out.'});
 if(level>=2)list.push({id:'div_row',module:'borrowing',concept:'dividends',label:'Cash dividends paid',source:`Additional information: paid ${money(div)}`,correct:{effect:'none',amount:0},why:'Paying owners is Financing. Leave it out.'});
 const ORDER=['dep','sale','cash_row','ar','inv','prepaid','equip','accum_row','ap','wages','unearned','notes_row','stock_row','re_row','div_row'];
 list.sort((x,y)=>ORDER.indexOf(x.id)-ORDER.indexOf(y.id));
 return {section:'operating',company,level,seed,opts,source:{company,period:'Year ended December 31, 2026',paperIS:isRows,paperBS:bs,supplemental,paperStyle:true,is:[],bs:[]},start:{label:'Net income',amount:ni},items:list,total,blank:!!opts.blank,
  check:{dCash,investing:proceeds-eqD,financing:borrow-div+stockIssue,eqRoll:[eqB,eqD,soldCost,eqE],adRoll:[adB,dep,soldAccum,adE],reRoll:[reB,ni,div,reE]}};
}

// opts: {force:'gain'|'loss', blank:true}
function investingScenario(seed,level,opts={}){
 const r=rng(seed*104729+level*17);const company=pick(r,COMPANIES);
 // --- the deals ---
 const eqBuy=H(8000+r()*20000);
 const soldCost=H(6000+r()*10000);let soldAccum=H(soldCost*(0.4+r()*0.3));if(soldCost-soldAccum<1000)soldAccum=soldCost-1000;const book=soldCost-soldAccum;
 const saleKind=level===1?'book':(opts.force||(r()<0.5?'gain':'loss'));
 let ga=saleKind==='book'?0:H(300+r()*1500);if(saleKind==='loss'&&book-ga<500)ga=Math.max(300,book-500);const proceeds=saleKind==='gain'?book+ga:saleKind==='loss'?book-ga:book;
 const landPrice=H(10000+r()*20000);const landCash=level===1?landPrice:H(landPrice*(0.3+r()*0.3));const landNote=landPrice-landCash;
 const van=level>=3?H(12000+r()*10000):0;
 const dep=H(2000+r()*4000),invBuy=H(5000+r()*8000),borrow=level>=2?H(5000+r()*15000):0,div=level>=2?H(1000+r()*3000):0;
 const total=-eqBuy+proceeds-landCash;
 // --- balance sheet rows rolled forward from the deals ---
 const eqB=H(40000+r()*30000),eqE=eqB+eqBuy+van-soldCost;
 const adB=H(12000+r()*8000),adE=adB+dep-soldAccum;
 const landB=H(20000+r()*20000),landE=landB+landPrice;
 const npB=H(10000+r()*10000),npE=npB+landNote+van+borrow;
 const row=(id,label,begin,end)=>({id,label,begin,end});
 const bsRows=[row('ppe','Equipment',eqB,eqE),row('accum','Less: Accumulated depreciation',-adB,-adE),row('land','Land',landB,landE)];
 if(level>=2)bsRows.push(row('notes','Notes payable (long-term)',npB,npE));
 const isRows=[['Depreciation expense',-dep]];
 if(saleKind==='gain')isRows.push(['Gain on sale of equipment',ga]);if(saleKind==='loss')isRows.push(['Loss on sale of equipment',-ga]);
 // --- additional information ---
 const supplemental=[];
 supplemental.push(`New equipment was purchased for ${money(eqBuy)} cash.`);
 if(saleKind==='book')supplemental.push(`Old equipment that originally cost ${money(soldCost)} and had accumulated depreciation of ${money(soldAccum)} was sold for ${money(proceeds)} cash.`);
 else if(level===2)supplemental.push(`Old equipment with a book value of ${money(book)} was sold at a ${money(ga)} ${saleKind}. (Book value = cost ${money(soldCost)} − accumulated depreciation ${money(soldAccum)}.)`);
 else supplemental.push(`Old equipment that originally cost ${money(soldCost)} and had accumulated depreciation of ${money(soldAccum)} was sold. The income statement shows a ${money(ga)} ${saleKind} on the sale.`);
 if(level===1)supplemental.push(`Land was purchased for ${money(landPrice)} cash.`);
 else supplemental.push(`Land was purchased for ${money(landPrice)}: ${money(landCash)} was paid in cash and a long-term note was signed for the other ${money(landNote)}.`);
 if(level>=3)supplemental.push(`A delivery van was acquired for ${money(van)} by signing a long-term note. No cash was paid.`);
 supplemental.push(`Inventory purchases during the year totaled ${money(invBuy)}.`);
 if(level>=2)supplemental.push(`The company borrowed ${money(borrow)} from the bank on a long-term note.`);
 if(level>=2)supplemental.push(`Cash dividends of ${money(div)} were paid.`);
 // --- items: real lines first, then everything a student might wrongly include ---
 const INV='Investing counts only cash paid for long-term assets and cash received from selling them.';
 const list=[];
 list.push({id:'buy',module:'ppe_purchase',concept:'ppe_purchase',line:'Purchase of equipment',label:'Purchase of equipment',source:`Additional information: bought for ${money(eqBuy)} cash`,correct:{effect:'subtract',amount:eqBuy},why:`${INV} Equipment is a long-term asset and ${money(eqBuy)} of cash went out to buy it. Outflow ${money(eqBuy)}.`});
 const saleWhy=saleKind==='book'?`${INV} The buyer paid ${money(proceeds)} cash for the old equipment, so that is the inflow. Cost and accumulated depreciation are bookkeeping, not cash.`:saleKind==='gain'?`${INV} The cash is not stated, so rebuild it: book value ${money(book)} + gain ${money(ga)} = ${money(proceeds)} received. A gain means the buyer paid more than book value. Inflow ${money(proceeds)}.`:`${INV} The cash is not stated, so rebuild it: book value ${money(book)} − loss ${money(ga)} = ${money(proceeds)} received. A loss means the buyer paid less than book value. Inflow ${money(proceeds)}.`;
 list.push({id:'sale',module:'gain_on_sale',concept:'ppe_sale',line:'Sale of equipment',label:'Sale of equipment',source:level===1?`Additional information: sold for ${money(proceeds)} cash`:`Additional information: book value ${money(book)}, ${saleKind} ${money(ga)}`,correct:{effect:'add',amount:proceeds},why:saleWhy});
 list.push({id:'land',module:'ppe_purchase',concept:'ppe_purchase',line:'Purchase of land',label:'Purchase of land',source:level===1?`Additional information: ${money(landPrice)} cash`:`Additional information: ${money(landCash)} cash + ${money(landNote)} note`,correct:{effect:'subtract',amount:landCash},why:level===1?`${INV} Land is a long-term asset and ${money(landPrice)} of cash went out. Outflow ${money(landPrice)}.`:`${INV} Only ${money(landCash)} of cash went out; the ${money(landNote)} note is a promise to pay later, not cash. Outflow ${money(landCash)}. The note part is listed in a separate note under the statement.`});
 if(level>=3)list.push({id:'van',module:'noncash_investing_financing',concept:'noncash_investing_financing',label:'Van acquired by signing a note',source:`Additional information: ${money(van)} note, no cash`,correct:{effect:'none',amount:0},why:'No cash moved, so it is not a cash flow in any section. It goes in a separate note under the statement.'});
 if(saleKind!=='book')list.push({id:'gl',module:'gain_on_sale',concept:saleKind==='gain'?'gain_on_sale':'loss_on_sale',label:`${saleKind==='gain'?'Gain':'Loss'} on sale of equipment`,source:`Income statement: ${money(ga)}`,correct:{effect:'none',amount:0},why:`The ${saleKind} is the difference between the cash received and book value, not the cash itself. Investing reports the cash (${money(proceeds)}); the ${saleKind} is handled in Operating. Leave it out here.`});
 list.push({id:'dep',module:'depreciation',concept:'depreciation',label:'Depreciation expense',source:`Income statement: ${money(dep)}`,correct:{effect:'none',amount:0},why:'Depreciation is an expense with no cash. It is an Operating adjustment, not an Investing line. Leave it out.'});
 list.push({id:'inv',module:'inventory',concept:'inventory',label:'Purchase of inventory',source:`Additional information: ${money(invBuy)}`,correct:{effect:'none',amount:0},why:'Inventory is bought to sell in the normal business. That is Operating, not Investing. Leave it out.'});
 if(level>=2)list.push({id:'borrow',module:'borrowing',concept:'borrowing',label:'Borrowed on note payable',source:`Additional information: ${money(borrow)}`,correct:{effect:'none',amount:0},why:'Borrowing is cash from a lender: Financing. Leave it out.'});
 if(level>=2)list.push({id:'div',module:'borrowing',concept:'dividends',label:'Cash dividends paid',source:`Additional information: ${money(div)}`,correct:{effect:'none',amount:0},why:'Paying owners is Financing. Leave it out.'});
 if(level>=2)list.push({id:'eqchg',module:'ppe_purchase',concept:'ppe_purchase',label:'Change in Equipment (at cost)',source:`Equipment: ${fmt(eqB)} → ${fmt(eqE)}`,correct:{effect:'none',amount:0},why:`The balance change mixes the purchase and the sale (${fmt(eqB)} + ${fmt(eqBuy+van)} − ${fmt(soldCost)} = ${fmt(eqE)}). Use the deals, one line each, not the net change.`});
 return {section:'investing',company,level,seed,opts,source:{company,period:'Year ended December 31, 2026',kind:'investing',paperStyle:true,paperIS:isRows,bsRows,supplemental,is:[],bs:[]},start:null,items:list,total,blank:!!opts.blank,
  check:{eqRoll:[eqB,eqBuy+van,soldCost,eqE],adRoll:[adB,dep,soldAccum,adE],landRoll:[landB,landPrice,landE],npRoll:[npB,landNote+van+borrow,npE],book,proceeds,ga,saleKind}};
}

// opts: {blank:true}
function financingScenario(seed,level,opts={}){
 const r=rng(seed*7907+level*23);const company=pick(r,COMPANIES);
 const borrow=H(15000+r()*35000),princ=H(5000+r()*12000),interest=H(500+r()*2000),stock=H(10000+r()*30000);
 const ni=H(12000+r()*25000),div=H(2000+r()*8000),treas=level>=3?H(3000+r()*7000):0,bldgNote=level>=3?H(20000+r()*30000):0;
 const eqSale=H(1500+r()*5000),dep=H(2000+r()*5000);
 const npB=H(20000+r()*30000),npE=npB+borrow-princ+bldgNote;
 const csB=H(40000+r()*40000),csE=csB+stock;
 const reB=H(30000+r()*40000),reE=reB+ni-div;
 const total=borrow-princ+stock-div-treas;
 const row=(id,label,begin,end)=>({id,label,begin,end});
 const bsRows=[row('notes','Notes payable (long-term)',npB,npE),row('stock','Common stock',csB,csE),row('re','Retained earnings',reB,reE)];
 if(level>=3)bsRows.push(row('treas','Less: Treasury stock',0,-treas));
 const isRows=[['Depreciation expense',-dep],['Interest expense',-interest],['Net income',ni]];
 const supplemental=[];
 supplemental.push(`The company borrowed ${money(borrow)} from the bank on a long-term note.`);
 if(level===1){supplemental.push(`The company repaid ${money(princ)} of principal on an older note.`);supplemental.push(`Interest of ${money(interest)} was paid in cash.`);}
 else supplemental.push(`The company paid the bank ${money(princ+interest)} on an older note: ${money(princ)} of principal and ${money(interest)} of interest.`);
 supplemental.push(`Common stock was issued to investors for ${money(stock)} cash.`);
 if(level===1)supplemental.push(`Cash dividends of ${money(div)} were paid.`);
 else supplemental.push(`Retained earnings was ${money(reB)} at the start of the year and ${money(reE)} at the end. Net income for the year was ${money(ni)}. All dividends were paid in cash.`);
 if(level>=3)supplemental.push(`The company bought back ${money(treas)} of its own shares for cash (treasury stock).`);
 if(level>=3)supplemental.push(`A building was acquired by signing a ${money(bldgNote)} long-term note. No cash was paid.`);
 supplemental.push(`Old equipment was sold for ${money(eqSale)} cash.`);
 const FIN='Financing counts only cash that came in from lenders and owners and cash that went back out to them.';
 const list=[];
 list.push({id:'borrow',module:'borrowing',concept:'borrowing',line:'Borrowed on long-term note payable',label:'Borrowed on long-term note',source:`Additional information: ${money(borrow)}`,correct:{effect:'add',amount:borrow},why:`${FIN} ${money(borrow)} came in from a lender. Inflow ${money(borrow)}.`});
 list.push({id:'princ',module:'borrowing',concept:'debt_repayment',line:'Repaid principal on note payable',label:'Repaid note principal',source:level===1?`Additional information: ${money(princ)}`:`Additional information: ${money(princ)} of the ${money(princ+interest)} payment`,correct:{effect:'subtract',amount:princ},why:`${FIN} ${money(princ)} went back to the lender to reduce what is owed. Outflow ${money(princ)}. The ${money(interest)} of interest is the cost of borrowing, an expense already inside net income, so it is Operating.`});
 list.push({id:'stock',module:'borrowing',concept:'stock_issuance',line:'Issued common stock',label:'Issued common stock',source:`Additional information: ${money(stock)}`,correct:{effect:'add',amount:stock},why:`${FIN} ${money(stock)} came in from owners buying shares. Inflow ${money(stock)}.`});
 list.push({id:'div',module:'borrowing',concept:'dividends',line:'Paid cash dividends',label:'Paid cash dividends',source:level===1?`Additional information: ${money(div)}`:`Retained earnings: ${money(reB)} + net income ${money(ni)} − dividends = ${money(reE)}`,correct:{effect:'subtract',amount:div},why:level===1?`${FIN} ${money(div)} went back out to owners. Outflow ${money(div)}.`:`${FIN} The dividends are not stated, so find them: start ${money(reB)} + net income ${money(ni)} − dividends = end ${money(reE)}, so dividends = ${money(div)}. Cash back to owners. Outflow ${money(div)}.`});
 if(level>=3)list.push({id:'treas',module:'borrowing',concept:'dividends',line:'Purchased treasury stock',label:'Bought back shares (treasury stock)',source:`Additional information: ${money(treas)}`,correct:{effect:'subtract',amount:treas},why:`${FIN} ${money(treas)} went back to owners to buy their shares. Outflow ${money(treas)}.`});
 list.push({id:'interest',module:'borrowing',concept:'debt_repayment',label:'Interest paid',source:`Additional information: ${money(interest)}`,correct:{effect:'none',amount:0},why:'Interest is the cost of borrowing, an expense already inside net income. It is Operating, not Financing. Leave it out.'});
 if(level>=3)list.push({id:'bldg',module:'noncash_investing_financing',concept:'noncash_investing_financing',label:'Building acquired by signing a note',source:`Additional information: ${money(bldgNote)} note, no cash`,correct:{effect:'none',amount:0},why:'No cash moved, so it is not a line in any section. It goes in a separate note under the statement.'});
 list.push({id:'eqsale',module:'ppe_purchase',concept:'ppe_sale',label:'Sale of equipment',source:`Additional information: ${money(eqSale)} cash`,correct:{effect:'none',amount:0},why:'Selling a long-term asset is Investing, not Financing. Leave it out.'});
 list.push({id:'dep',module:'depreciation',concept:'depreciation',label:'Depreciation expense',source:`Income statement: ${money(dep)}`,correct:{effect:'none',amount:0},why:'Depreciation is an expense with no cash. It is an Operating adjustment, not a Financing line. Leave it out.'});
 if(level>=2)list.push({id:'ni',module:'three_sections',concept:'borrowing',label:'Net income',source:`Income statement: ${money(ni)}`,correct:{effect:'none',amount:0},why:'Net income is the starting line of Operating, not a Financing line. Here it is only used to find the dividends.'});
 if(level>=2)list.push({id:'rechg',module:'borrowing',concept:'dividends',label:'Change in Retained earnings',source:`Retained earnings: ${fmt(reB)} → ${fmt(reE)}`,correct:{effect:'none',amount:0},why:'Retained earnings changes by net income minus dividends. It is not a cash line; use it only to find the dividends. Leave the balance change out.'});
 return {section:'financing',company,level,seed,opts,source:{company,period:'Year ended December 31, 2026',kind:'financing',paperStyle:true,paperIS:isRows,bsRows,supplemental,is:[],bs:[]},start:null,items:list,total,blank:!!opts.blank,
  check:{npRoll:[npB,borrow,princ,bldgNote,npE],csRoll:[csB,stock,csE],reRoll:[reB,ni,div,reE],treas,total}};
}

export function scenario(section,seed,level,opts={}){return section==='operating'?operatingScenario(seed,level,opts):section==='investing'?investingScenario(seed,level,opts):financingScenario(seed,level,opts);}

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
 const slots=(draft.__slots||[]).map((s,i)=>({i,label:s?.label||'',effect:s?.effect||'',amount:parseAmt(s?.amount)})).filter(s=>(s.label||s.effect||s.amount)&&s.effect!=='none');
 const required=sc.items.filter(it=>it.correct.effect!=='none');
 const used=new Set();
 const rows=required.map(it=>{const s=slots.find(s=>!used.has(s.i)&&s.label===it.label);if(!s)return {item:it,ok:false,missing:true,effOK:false,amtOK:false,effect:'',amount:0};used.add(s.i);const effOK=s.effect===it.correct.effect,amtOK=Math.abs(s.amount-it.correct.amount)<1;return {item:it,ok:effOK&&amtOK,effOK,amtOK,effect:s.effect,amount:s.amount,slot:s.i};});
 const extras=slots.filter(s=>!used.has(s.i)).map(s=>{const it=sc.items.find(it=>it.label===s.label);return {i:s.i,label:s.label||'(no account chosen)',effect:s.effect,amount:s.amount,why:it?it.why:'This account was already used, or no account was chosen.',item:it||null};});
 const startGiven=sc.start?parseAmt(draft.__start):0;const startOK=sc.start?Math.abs(startGiven-sc.start.amount)<1:true;
 const own=startGiven+slots.reduce((n,s)=>n+(s.effect==='add'?s.amount:s.effect==='subtract'?-s.amount:0),0);
 const totalGiven=parseSigned(draft.__total);const totalKey=Math.abs(totalGiven-sc.total)<1;const totalConsistent=Math.abs(totalGiven-own)<1;const totalOK=totalKey||totalConsistent;
 const lineScore=Math.max(0,rows.filter(r=>r.ok).length-extras.length);
 const max=required.length+1+(sc.start?1:0),score=lineScore+(sc.start?(startOK?1:0):0)+(totalOK?1:0);
 return {rows,extras,totalGiven,totalOK,totalKey,totalConsistent,own,startOK,score,max,blank:true};
}

export function answerStatementHTML(sc){
 const lines=[];if(sc.start)lines.push([sc.start.label,sc.start.amount]);
 for(const it of sc.items){if(it.correct.effect==='none')continue;lines.push([it.line||it.label,it.correct.effect==='add'?it.correct.amount:-it.correct.amount]);}
 return `<div class="statement-head"><strong>${esc(sc.company)}</strong><span>Statement of Cash Flows (partial)</span><span>Indirect method · ${esc(sc.source.period||'')}</span></div><div class="scf-section"><h3>Cash flows from ${sc.section} activities</h3>${lines.map(([l,a])=>`<div class="scf-line"><span>${esc(l)}</span><b>${fmt(a)}</b></div>`).join('')}<div class="scf-line total"><span>${TOTAL_LABEL[sc.section]}</span><b>${fmt(sc.total)}</b></div></div>`;
}
export function effectsFor(section){return EFFECTS[section];}
export function totalLabel(section){return TOTAL_LABEL[section];}

export const ONE_LINE='Net income counts revenue when it is earned and expenses when they happen. Cash counts money when it actually moves. Each line below closes one gap between the two.';
export const PROCEDURE={
 operating:['Start with net income (bottom line of the income statement).','Add back depreciation: it is an expense with no cash.','Subtract a gain, add back a loss: the sale cash is reported in Investing.','Current assets (A/R, Inventory, Prepaid Expenses): went UP → subtract the change (cash is behind net income). Went DOWN → add it.','Current liabilities (A/P, Wages Payable, Unearned Revenue): went UP → add the change (cash is ahead of net income). Went DOWN → subtract it.','Leave out Cash, Equipment, Accumulated depreciation, Notes payable, Common stock, and Retained earnings.','Add the signed amounts. Parentheses mean subtract.'],
 investing:['Investing lists the actual cash paid to buy long-term assets (equipment, land, buildings, long-term investments) and the actual cash received from selling them. It does not start from net income.','Buy → cash out, in parentheses. Sell → cash in. One line per deal.','How much cash? If the problem states it, use it. If a sale gives book value and a gain or loss instead: book value + gain, or book value − loss (book value = cost − accumulated depreciation). If part of a purchase was a note, only the cash part.','No cash at all (an asset acquired by signing a note)? Not a line in any section; it goes in a separate note under the statement.','Leave out: depreciation and the gain or loss (those are Operating); borrowing, stock and dividends (Financing); inventory (Operating); the net change in the Equipment balance (use the deals instead).','Add the lines. Label the total “Net cash provided (used) by investing activities.” Parentheses mean cash went out.'],

 financing:['Financing lists the actual cash that came in from lenders and owners and the actual cash that went back out to them. It does not start from net income.','Cash in: borrow on a note or bonds; issue stock. Cash out: repay principal; pay dividends; buy back shares. One line per deal.','A loan payment: only the principal part is Financing. The interest part is the cost of borrowing, already inside net income, so it is Operating.','Dividends not stated? Start retained earnings + net income − dividends = end retained earnings. Solve for dividends.','No cash at all (a note or shares given for an asset)? Not a line in any section; a separate note under the statement.','Leave out interest (Operating), depreciation and net income (Operating), and selling or buying long-term assets (Investing).','Add the lines. Label the total “Net cash provided (used) by financing activities.”'],

};

// Documents laid out the way the paper test lays them out: multi-step income statement; balance sheet with This year | Last year.
export function paperDocsHTML(sc){
 const s=sc.source;if(!s.paperStyle)return '';
 if(s.kind==='investing'||s.kind==='financing'){
  const line=([label,amt])=>`<div class="pl"><span>${esc(label)}</span><b>${fmt(amt)}</b></div>`;
  const is=`<div class="statement paper"><div class="statement-head"><strong>${esc(s.company)}</strong><span>Income Statement (selected lines)</span><span>For the ${esc(s.period)}</span></div>${s.paperIS.map(line).join('')}</div>`;
  const row=(r)=>`<div class="pl3"><span>${esc(r.label)}</span><b>${fmt(r.end)}</b><b>${fmt(r.begin)}</b></div>`;
  const bs=`<div class="statement paper"><div class="statement-head"><strong>${esc(s.company)}</strong><span>Balance Sheet (selected rows)</span><span>December 31, 2026 and 2025</span></div><div class="pl3 head"><span></span><b>2026</b><b>2025</b></div>${s.bsRows.map(row).join('')}<div class="small muted" style="margin-top:6px">Selected rows only. Columns are this year (2026) then last year (2025).</div></div>`;
  const supp=`<div class="statement paper"><div class="statement-head"><strong>${esc(s.company)}</strong><span>Additional information for 2026</span><span></span></div><ol class="supp">${s.supplemental.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`;
  return supp+is+bs;
 }
 const line=([label,amt,kind])=>`<div class="pl ${kind||''}"><span>${esc(label)}</span><b>${amt==null?'':fmt(amt)}</b></div>`;
 const is=`<div class="statement paper"><div class="statement-head"><strong>${esc(s.company)}</strong><span>Income Statement</span><span>For the ${esc(s.period)}</span></div>${s.paperIS.map(line).join('')}</div>`;
 const row=(r)=>`<div class="pl3"><span>${esc(r.label)}</span><b>${fmt(r.end)}</b><b>${fmt(r.begin)}</b></div>`;
 const bs=`<div class="statement paper"><div class="statement-head"><strong>${esc(s.company)}</strong><span>Comparative Balance Sheets</span><span>December 31, 2026 and 2025</span></div><div class="pl3 head"><span></span><b>2026</b><b>2025</b></div><div class="pl3 sec"><span>Assets</span><b></b><b></b></div><div class="pl3 sub"><span>Current assets:</span><b></b><b></b></div>${s.paperBS.ca.map(row).join('')}${s.paperBS.lt.map(row).join('')}<div class="pl3 total"><span>Total assets</span><b>${fmt(s.paperBS.totalAssets[1])}</b><b>${fmt(s.paperBS.totalAssets[0])}</b></div><div class="pl3 sec"><span>Liabilities and Stockholders’ Equity</span><b></b><b></b></div><div class="pl3 sub"><span>Current liabilities:</span><b></b><b></b></div>${s.paperBS.cl.map(row).join('')}${s.paperBS.ltl.map(row).join('')}${s.paperBS.eq.map(row).join('')}<div class="pl3 total"><span>Total liabilities and stockholders’ equity</span><b>${fmt(s.paperBS.totalLE[1])}</b><b>${fmt(s.paperBS.totalLE[0])}</b></div><div class="small muted" style="margin-top:6px">Columns are this year (2026) then last year (2025). A change is this year minus last year.</div></div>`;
 const supp=`<div class="statement paper"><div class="statement-head"><strong>${esc(s.company)}</strong><span>Additional information for 2026</span><span></span></div><ol class="supp">${s.supplemental.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div>`;
 return is+bs+supp;
}
