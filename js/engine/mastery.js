import {independentAttempt} from './learning-support.js';
import {TIMING,SKILLS} from '../curriculum/concepts.js';
export function evidence(a){if(!a.correct||a.revealed)return 0;if(!independentAttempt(a))return a.hintsUsed?.length ? .35 : .55;if(a.hintsUsed?.length)return .70;if(a.tier>=4)return 1.25;if(a.tier>=3)return 1.15;return 1;}
export function opportunities(attempts){const groups=new Map();for(const a of attempts){const key=a.opportunityId||a.problemId;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(a);}return [...groups.values()].map(xs=>({attempts:xs,correct:xs.every(a=>a.correct&&!a.revealed),weight:Math.min(...xs.map(evidence)),independent:xs.every(independentAttempt),direction:xs[0].direction,mixed:xs.some(a=>a.tier>=3),revealed:xs.some(a=>a.revealed)}));}
export function skillStats(attempts,concept,skill){const xs=attempts.filter(a=>a.concept===concept&&a.skill===skill&&a.mode!=='remediation');const groups=opportunities(xs).slice(-6);const independent=groups.filter(g=>g.independent);return {count:groups.length,independent:independent.length,score:groups.length?groups.reduce((n,g)=>n+Math.min(1,g.weight),0)/groups.length:null,state:!groups.length?'Not started':independent.length>=3&&independent.slice(-3).every(g=>g.correct&&g.weight>=1)?'Secure':'Practicing'};}

export function mastery(attempts,concept,config={}){
 const xs=attempts.filter(a=>a.concept===concept&&a.skill!=='explain'&&a.mode!=='remediation');if(!xs.length)return {state:'Not started',score:null,count:0};
 const all=opportunities(xs),ind=all.filter(a=>a.independent).slice(-8),score=ind.length?ind.reduce((s,a)=>s+Math.min(1,a.weight),0)/ind.length:0;
 const directions=new Set(ind.filter(a=>a.correct).map(a=>a.direction));const both=!TIMING[concept]||(directions.has('increase')&&directions.has('decrease'));
 const required=TIMING[concept]?['compute_change','interpret','recognition_cash_connect','place_line']:['gain_on_sale','loss_on_sale'].includes(concept)?['recognition_cash_connect','derive_actual_cash','place_line']:['depreciation','amortization'].includes(concept)?['recognition_cash_connect','place_line']:['place_line'];
 const coverage=required.every(skill=>{const a=xs.filter(x=>x.skill===skill).slice(-3);return a.some(x=>x.correct&&!x.revealed)&&a.filter(x=>!x.correct).length<2;});
 const recentWrong=xs.slice(-10).filter(x=>!x.correct).map(x=>x.misconceptionCode);const persistent=recentWrong.some(c=>recentWrong.filter(x=>x===c).length>=3);
 const secure=ind.filter(a=>a.correct&&a.weight>=1).length>=3&&score>=(config.secureThreshold??.75)&&both&&coverage&&!persistent;
 const mastered=secure&&ind.length>=5&&score>=(config.masteryThreshold??.85)&&ind.some(a=>a.mixed&&a.correct)&&!ind.slice(-3).some(a=>a.revealed);
 return {state:mastered?'Mastered':secure?'Secure':ind.length?'Practicing':'Learning',score:ind.length?score:null,count:ind.length,coverage,both};
}
export function recentAccuracy(attempts){const a=opportunities(attempts.filter(x=>x.scaffoldLevel>=2&&x.mode!=='remediation')).slice(-20);return a.length?a.filter(x=>x.correct).length/a.length:null;}
export function weakestSkill(attempts,concept){return ['locate','compute_change','interpret','recognition_cash_connect','adjustment_direction','place_line'].map(skill=>({skill,...skillStats(attempts,concept,skill)})).sort((a,b)=>(a.score??.4)-(b.score??.4)||a.count-b.count)[0].skill;}
