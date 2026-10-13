import {TIMING,conceptName} from './concepts.js';
import {WORKED_STORIES} from './worked-stories.js';
import {generate,choice,number} from './generators.js';
import {money,shuffle} from '../utils.js';

export const LESSON_REVISION='learning-2026-10-13-v2';
export const REVISED_MODULES=['indirect_bridge',...Object.keys(TIMING),'depreciation','gain_on_sale'];
const see=(title,body,learning)=>({type:'observe',title,body,visual:{learning}});
const source=(supplemental,bs=[],is=[])=>({company:'Beacon Bike & Repair',period:'Isolated teaching example',supplemental,bs,is});
const task=(id,concept,src,prompts,explanation)=>({id,seed:1,concept,section:'operating',family:'guided_connection',direction:'none',tier:1,scaffoldLevel:1,sourceComplexity:'isolated',sourceTab:'supplemental',intro:'Same teaching example · connect the story before choosing a sign.',source:src,prompts:prompts.map((q,i)=>({...q,...(q.choices?{choices:shuffle(q.choices,31+i*17)}:{})})),hints:['Compare what income recognized with the cash that actually moved.',explanation],explanation,expected:{},misconceptionTargets:['M33']});
const place=(skill,text,label,section,amount,code,hints)=>({skill,type:'place',text,label,fixedSection:section,correct:{section,amount},code,hints});

export function timingLadder(id,config={}){
 const c=TIMING[id],name=conceptName(id,config),items=[see(`${name}: follow one cash story`,['First predict the cash effect. Then compare it with the income effect, finish a reconciliation, and try new numbers.','Each decrease is a separate case. We keep its beginning balance and facts visible.'],{kind:'map'})];
 WORKED_STORIES[id].forEach((s,i)=>{
  const direction=i?'decrease':'increase',label=`${i?'Decrease':'Increase'} in ${name}`;
  const src=source([s.story,'Only this transaction is shown; this is not a complete company statement.'],[{id,label:name,begin:s.begin,end:s.end,group:c.territory}],[{label:'Effect on Net Income of this transaction',amount:s.income}]);
  const predict=choice('recognition_cash_connect','Which pair describes this transaction? (Parentheses mean a decrease.)',`Income effect ${money(s.income)}; cash effect ${money(s.cash)}`,[`Income effect ${money(s.cash)}; cash effect ${money(s.income)}`,`Income effect ${money(s.income)}; cash effect ${money(s.income)}`],'M33',s.why);
  predict.hints=['Point to the work, expense, or cost recognized. Then point to the actual receipt or payment.',s.why];
  items.push(task(`L2-${id}-${direction}-predict`,id,src,[predict],s.why));
  items.push(see(`${i?'Separate decrease case':'Increase case'}: make the gap visible`,[s.story,s.why],{kind:'timing',concept:id,index:i}));
  const completion=task(`L2-${id}-${direction}-complete`,id,src,[{skill:'compute_change',sourceTab:'bs',type:'direction_amount',text:`Read the Balance Sheet: how did ${name} change?`,correct:{direction,amount:Math.abs(s.end-s.begin)},end:s.end,hints:[`Beginning ${money(s.begin)}; ending ${money(s.end)}. Compare them first.`,`The ${direction} is ${money(Math.abs(s.end-s.begin))}.`]},place('place_line',`Complete the Operating adjustment. Income effect ${money(s.income)} must reconcile to cash effect ${money(s.cash)}.`,label,'operating',s.adjustment,'M33',[`What must you add or subtract from ${money(s.income)} to reach ${money(s.cash)}?`,s.why])],s.why);
  completion.direction=direction;items.push(completion);
  const independent=generate(id,i?422:317,2,direction,config);
  independent.intro='New numbers · explain the same direction without the worked example.';
  independent.prompts=independent.reasoningPrompts.filter(q=>['compute_change','interpret','recognition_cash_connect','place_line'].includes(q.skill));
  items.push(independent);
 });return items;
}

export function depreciationLadder(config={}){
 const src=source(['Cash revenue $1,000; cash operating costs $400. Depreciation expense $100 relates to equipment purchased in an earlier period. No other transactions.'],[],[{label:'Revenue',amount:1000},{label:'Cash operating expenses',amount:-400},{label:'Depreciation expense',amount:-100},{label:'Net Income',amount:500,total:true}]);
 return [see('Depreciation: expense now, purchase cash earlier',['The equipment purchase and the depreciation entry are different events. Recording this period’s depreciation does not pay anyone.','We will compare Net Income of $500 with $600 of operating cash.'],{kind:'map'}),task('L2-dep-predict','depreciation',src,[number('recognition_cash_connect','How much cash is paid when this $100 depreciation entry is recorded?',0,'M16')],'The depreciation entry uses no cash. $1,000 receipts − $400 payments = $600 operating cash.'),see('The add-back does not create cash',['The expense reduced Net Income. The add-back removes that noncash reduction from the reconciliation.','The original equipment purchase belongs to Investing in its purchase period.'],{kind:'depreciation'}),task('L2-dep-complete','depreciation',src,[place('place_line','Complete the reconciliation from $500 Net Income to operating cash.','Depreciation','operating',100,'M16',['Net Income was reduced by an expense with no current payment.','$500 + $100 = $600 operating cash.']),number('reconcile','What is net cash from operating activities?',600,'M16')],'$500 + $100 = $600, matching $1,000 receipts less $400 cash payments.'),generate('depreciation',7,2),...(config.curriculum?.includeAmortization!==false?[see('Amortization: the same reasoning',['An intangible asset’s cost is allocated to expense. Ask the same two questions: what reduced income, and did this expense entry pay anyone?'],{kind:'map'}),generate('amortization',4,2)]:[])];
}

export function saleCase(kind){const proceeds=kind==='gain'?300:150,book=200,delta=proceeds-book;return {kind,cost:800,accumulated:600,book,proceeds,delta,ordinary:500,netIncome:500+delta,adjustment:-delta};}
export function gainsLadder(){
 const items=[see('An equipment sale has two jobs on the statement',['Job 1: remove the sale’s gain or loss from the Operating reconciliation because that effect is already in Net Income.','Job 2: report the buyer’s actual cash payment in Investing. The gain or loss is a real income measurement, but is not a separate receipt or payment.'],{kind:'map'})];
 for(const kind of ['gain','loss']){
  const s=saleCase(kind),g=kind==='gain',amount=Math.abs(s.delta),concept=g?'gain_on_sale':'loss_on_sale';
  const facts=[`Equipment cost $800; accumulated depreciation $600. Carrying amount (book value) is $200, not an estimate of market value.`,`The buyer pays ${money(s.proceeds)} cash.`,`Apart from this sale, all revenue and expenses are in cash and generate $500 operating cash. No other adjustments, investing, or financing transactions.`];
  const src=source(facts,[],[{label:'Profit from ordinary operations',amount:500},{label:`${g?'Gain':'Loss'} on equipment sale`,amount:s.delta},{label:'Net Income',amount:s.netIncome,total:true}]);
  items.push(task(`L2-${kind}-predict`,concept,src,[choice('derive_actual_cash','Which amount is the cash received from the buyer?',money(s.proceeds),[money(s.book),money(amount),money(s.cost)],'M19','Proceeds means the buyer’s payment. Cost, carrying amount, and gain/loss have different jobs.'),choice('classify_section','Why does the sale receipt belong in Investing?','It is cash received for a long-term asset.',['Every profitable sale is Operating.','A loss is always a Financing payment.'],'M27','Classify the transaction by its nature, not whether it made a gain or loss.')],`The only sale cash is ${money(s.proceeds)}, reported in Investing.`));
  items.push(see(`${g?'Gain':'Loss'}: trace the same numbers through the statements`,[`Cost $800 − accumulated depreciation $600 = carrying amount $200. Cash proceeds ${money(s.proceeds)} compared with $200 give a ${money(amount)} ${kind}.`,`The ${kind} ${g?'increased':'reduced'} Net Income by ${money(amount)}. ${g?'Subtract':'Add back'} that amount to remove the sale’s income effect from Operating. Investing reports the full proceeds.`],{kind:'sale',saleKind:kind}));
  items.push(task(`L2-${kind}-complete`,concept,src,[choice('recognition_cash_connect','After the sale’s income effect is removed, what operating cash remains?','$500',['$'+s.netIncome,'$'+(500+s.proceeds)],g?'M17':'M18','The ordinary operations generated $500 cash. The equipment sale does not change that Operating total.'),place('place_line','Complete the Operating reconciliation. Use the gain or loss amount, not the proceeds.',`${g?'Gain':'Loss'} on equipment sale`,'operating',s.adjustment,g?'M17':'M18',[`The ${kind} ${g?'raised':'lowered'} Net Income. Reverse that effect.`,`${money(s.netIncome)} ${g?'−':'+'} ${money(amount)} = $500.`]),place('derive_actual_cash','Complete the Investing receipt. Use the amount paid by the buyer.','Sale proceeds','investing',s.proceeds,'M19',['Proceeds are the buyer’s actual payment.',`Cash received: ${money(s.proceeds)}.`])],`Operating ${money(s.netIncome)} ${g?'−':'+'} ${money(amount)} = $500; Investing ${money(s.proceeds)}. Total cash increase ${money(500+s.proceeds)}.`));
  items.push(generate(concept,g?9:10,2));
 }
 items.push(see('Check your explanation, then transfer it',['A sale at book value has no gain or loss to reverse. Its cash proceeds still belong in Investing.','Before the next example, say which number measures the income effect and which number measures the cash receipt.'],{kind:'map'}),generate('gain_on_sale',15,3));return items;
}
