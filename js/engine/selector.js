import {rng} from '../utils.js';
import {TIMING} from '../curriculum/concepts.js';
import {generate} from '../curriculum/generators.js';
import {mastery,weakestSkill} from './mastery.js';
export const PRACTICE_CONCEPTS=[...Object.keys(TIMING),'depreciation','amortization','gain_on_sale','loss_on_sale','ppe_purchase','ppe_sale','borrowing','debt_repayment','stock_issuance','dividends','noncash_investing_financing'];
export function scheduleRetry(state,problem,skill,code,config={}){if(state.retryQueue.some(q=>q.concept===problem.concept&&q.skill===skill))return;const min=config.retryMinGap??3,max=Math.max(min,config.retryMaxGap??7);state.retryQueue.push({concept:problem.concept,skill,code,due:state.opportunities+min+1+(problem.seed%(max-min+1)),seed:problem.seed+7919});}
export function selectPractice(state,config={}){
 const set=state.practice||{},pool=state.lesson.introducedConcepts.filter(c=>PRACTICE_CONCEPTS.includes(c));if(!pool.length)return null;
 const random=rng(set.seed+set.done*101);let concept=set.focus,skill;
 const hist=state.attempts.filter(a=>a.mode==='practice');const last=[...new Map(hist.map(a=>[a.opportunityId,a.concept])).values()].slice(-2);const blocked=last.length===2&&last[0]===last[1]?last[0]:null;
 let due=-1;if(!concept)due=state.retryQueue.findIndex(q=>q.due<=state.opportunities&&pool.includes(q.concept)&&(q.concept!==blocked||pool.length===1));
 let seed=set.seed+set.done*313+1;
 if(due>=0){const retry=state.retryQueue.splice(due,1)[0];concept=retry.concept;skill=retry.skill;seed=retry.seed;}
 if(!concept){const options=pool.filter(c=>c!==blocked||pool.length===1).map(c=>{const m=mastery(state.attempts,c,config.mastery);const recent=hist.slice(-24).filter(a=>a.concept===c).length;return {c,w:(1+3*(1-(m.score??.3)))*(set.afterFocus===c?1.8:1)*(1+1/(recent+1))};});let target=random()*options.reduce((n,c)=>n+c.w,0);concept=options[0].c;for(const o of options){target-=o.w;if(target<=0){concept=o.c;break;}}}
 skill=skill||(set.weak?weakestSkill(state.attempts,concept):set.focus?['locate','compute_change','interpret','recognition_cash_connect','adjustment_direction','place_line'][set.done%6]:weakestSkill(state.attempts,concept));
 const direction=set.done%2?'decrease':'increase';let p=generate(concept,seed,TIMING[concept]?1:3,direction,config);p.tier=set.focus?2:3;p.scaffoldLevel=set.focus?3:4;p.sourceComplexity='full_statement';
 if(TIMING[concept]){const full=generate(concept,seed,4,direction,config);p.source=full.source;p.prompts=p.prompts.filter(q=>q.skill===skill);if(!p.prompts.length)p.prompts=full.prompts;p.id+=`-practice-${skill}`;}
 return p;
}
