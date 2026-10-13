import test from 'node:test';
import assert from 'node:assert/strict';
import {WORKED_STORIES} from '../js/curriculum/worked-stories.js';
import {workedStoryHTML} from '../js/ui/worked-stories.js';
import {lesson} from '../js/curriculum/lessons.js';

test('All 12 teaching examples reconcile recognition, balance changes, and cash',()=>{
 for(const [concept,cases] of Object.entries(WORKED_STORIES)){
  assert.equal(cases.length,2);
  for(const [i,c] of cases.entries()){
   const change=c.end-c.begin;
   const asset=['accounts_receivable','prepaid_expenses','inventory'].includes(concept);
   assert.equal(c.adjustment,asset?-change:change,concept);
   assert.equal(c.income+c.adjustment,c.cash,concept);
   assert.ok(i===0?change>0:change<0,concept);
   assert.ok(c.begin>=0&&c.end>=0);
  }
  // A stable case is predicted, explained, completed, then transferred to fresh numbers.
  const items=lesson(concept);
  assert.equal(items.length,10);assert.equal(items[0].type,'observe');assert.match(items[0].title,/What are we trying to do here/);
  assert.deepEqual(items.filter(p=>p.scaffoldLevel>=2).map(p=>p.seed),[317,422]);
  assert.deepEqual(items.filter(p=>p.scaffoldLevel>=2).map(p=>p.direction),['increase','decrease']);
  assert.equal(items[3].visual.learning.index,0);
  assert.equal(items[7].visual.learning.index,1);

 }
});

test('Worked examples distinguish separate cases, evidence sources, and scoped effects',()=>{
 for(const concept of Object.keys(WORKED_STORIES)){
  const html=workedStoryHTML(concept);
  assert.match(html,/<table>/);
  assert.match(html,/Income Statement/);
  assert.match(html,/Balance Sheet/);
  assert.match(html,/<details class="worked-reverse">/);
  assert.match(html,/not the company’s total/);
 }
 const html=workedStoryHTML('unearned_revenue',{terminology:{unearnedRevenue:'Deferred <Revenue>'}});
 assert.ok(html.includes('Deferred &lt;Revenue&gt;'));
 assert.ok(!html.includes('Deferred <Revenue>'));
});
