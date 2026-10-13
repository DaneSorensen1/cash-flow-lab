import test from 'node:test';
import assert from 'node:assert/strict';
import {lesson} from '../js/curriculum/lessons.js';
import {saleCase,LESSON_REVISION} from '../js/curriculum/learning-ladders.js';
import {generate} from '../js/curriculum/generators.js';
import {evaluate} from '../js/engine/remediation.js';
import {mastery,skillStats} from '../js/engine/mastery.js';
import {hintsFor,recordedProblem} from '../js/engine/learning-support.js';
import {fresh,migrate,record} from '../js/state.js';
import {completeDraft,responseFor,promptInputs} from '../js/ui/prompts.js';
import {learningVisual} from '../js/ui/learning-visuals.js';
import {studentEvidence,studentGuidanceHTML,teachingPlan} from '../js/ui/teacher-coaching.js';
import {parseAmount} from '../js/utils.js';

test('Gain and loss exhibits reconcile income, operating cash, and proceeds independently',()=>{
 for(const kind of ['gain','loss']){const s=saleCase(kind);assert.equal(s.cost-s.accumulated,s.book);assert.equal(s.proceeds-s.book,s.delta);assert.equal(s.delta+s.adjustment,0);assert.equal(s.netIncome+s.adjustment,500);assert.equal(s.netIncome+s.adjustment+s.proceeds,500+s.proceeds);const html=learningVisual({kind:'sale',saleKind:kind});assert.match(html,/Income Statement/);assert.match(html,/Statement of Cash Flows/);assert.match(html,/<th scope="row">/);assert.match(html,/Financing: no transactions/);}
});
test('Independent sale placement prompts do not supply section, sign, or answer amount',()=>{
 for(const kind of ['gain_on_sale','loss_on_sale'])for(const level of [2,3,4]){const p=generate(kind,9,level);for(const q of p.prompts.filter(q=>q.type==='place')){assert.equal(q.fixedSection,undefined);assert.doesNotMatch(q.text,/Operating|Investing|[0-9]|choose ADD|choose SUBTRACT/);assert.ok(q.hints.length>=2);assert.ok(evaluate(q,q.correct,p).correct);}}
});
test('Hints follow the current reasoning stage',()=>{const p=generate('accounts_receivable',317,1);assert.match(hintsFor(p,p.prompts.find(q=>q.skill==='compute_change'))[0],/^SEE/);assert.match(hintsFor(p,p.prompts.find(q=>q.skill==='recognition_cash_connect'))[0],/^CONNECT/);const sale=generate('loss_on_sale',10,3);assert.match(hintsFor(sale,sale.prompts.at(-1))[0],/buyer/);});
test('Placement accepts matching negative notation but rejects conflicting effect',()=>{
 const q={type:'place',correct:{section:'operating',amount:-100}};for(const amount of ['100','-100','(100)']){const d={section:'operating',sign:'-1',amount};assert.equal(completeDraft(q,d,parseAmount),true);assert.equal(responseFor(q,d,parseAmount).amount,-100);}
 assert.equal(completeDraft(q,{section:'operating',sign:'1',amount:'-100'},parseAmount),false);
 assert.match(promptInputs(q,{section:'operating'}),/Subtract from Net Income/);assert.doesNotMatch(promptInputs(q,{section:'operating'}),/cash came in/);
 assert.match(promptInputs(q,{section:'investing'}),/Cash inflow/);
});
test('Section, magnitude, and sign evidence remain separate when two errors occur',()=>{const q={type:'place',correct:{section:'operating',amount:-100}};assert.deepEqual(evaluate(q,{section:'investing',amount:100}).errorDimensions,{section:false,amount:true,effect:false});});
test('Source-location mistakes no longer share the placement-section code',()=>{const p=generate('accounts_receivable',1,1);const q=p.prompts[0];assert.equal(evaluate(q,q.choices.find(x=>x.value!==q.correct).value,p).misconceptionCode,'M34');});
test('Legacy progress preserves active drafts, completed work, and history while restarting revised sequence safely',()=>{const s=fresh();delete s.lesson.revision;s.lesson.positions.accounts_receivable=4;s.lesson.completedModules=['cash_change'];s.attempts=[{attemptId:'old'}];s.active={mode:'learn',moduleId:'accounts_receivable',itemIndex:4,problem:generate('accounts_receivable',422,4),step:1,drafts:{1:{amount:'123'}},help:{}};const original=JSON.stringify(s.active.problem);const next=migrate(s);assert.equal(next.active.legacyLessonRevision,true);assert.equal(JSON.stringify(next.active.problem),original);assert.equal(next.active.drafts[1].amount,'123');assert.equal(next.lesson.positions.accounts_receivable,0);assert.equal(next.lesson.revision,LESSON_REVISION);assert.deepEqual(next.lesson.completedModules,['cash_change']);assert.equal(next.attempts[0].attemptId,'old');assert.deepEqual(migrate(next),next);});
test('Attempt snapshots retain the actual fixed source even after problem mutation',()=>{const s=fresh(),p=lesson('gain_on_sale').find(p=>p.id==='L2-gain-predict'),q=p.prompts[0];record(s,p,q,q.correct,{correct:true});const a=s.attempts[0];assert.equal(recordedProblem(a).id,'L2-gain-predict');p.source.supplemental[0]='CHANGED';assert.ok(!recordedProblem(a).source.supplemental.includes('CHANGED'));assert.equal(recordedProblem({concept:'gain_on_sale',seed:1}),null);});
test('Old answer-cued sale attempts and wholly hinted successes do not establish Secure',()=>{const xs=Array.from({length:5},(_,i)=>['recognition_cash_connect','derive_actual_cash','place_line'].map(skill=>({concept:'gain_on_sale',skill,opportunityId:'p'+i,scaffoldLevel:3,tier:3,correct:true,contentVersion:'2026.10.13.1',hintsUsed:[]}))).flat();assert.equal(mastery(xs,'gain_on_sale').state,'Learning');const hinted=xs.map(x=>({...x,contentVersion:undefined,hintsUsed:['hint']}));assert.notEqual(skillStats(hinted,'gain_on_sale','place_line').state,'Secure');assert.notEqual(mastery(hinted,'gain_on_sale').state,'Secure');});
test('Teacher guidance uses response evidence and branches beyond hints',()=>{const row={name:'Student <A>',recentAttempts:[{concept:'gain_on_sale',skill:'place_line',correct:false,opportunityId:'one',misconceptionCode:'M17'},{concept:'gain_on_sale',skill:'place_line',correct:false,opportunityId:'one',misconceptionCode:'M17'}]};assert.equal(studentEvidence(row).concept,'gain_on_sale');const html=studentGuidanceHTML(row);assert.match(html,/Student &lt;A&gt;/);assert.match(html,/Reversal probe/);assert.match(html,/Fresh check/);assert.match(html,/Teacher answer and reasoning/);assert.doesNotMatch(html,/guessing|not reading/);assert.match(teachingPlan('ppe_purchase').reteach,/not gross Equipment cost/);assert.match(studentGuidanceHTML({recentAttempts:[]}),/No recent answer evidence/);});
