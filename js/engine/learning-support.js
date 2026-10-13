// Hint order follows the current question, not the start of the whole problem.
export function hintsFor(problem,prompt){
 if(prompt.hints?.length)return prompt.hints;
 const all=problem.hints||[];
 const tags={locate:['WHERE'],compute_change:['SEE','ACT'],interpret:['INTERPRET','CONNECT'],recognition_cash_connect:['CONNECT','INTERPRET'],adjustment_direction:['ACT','CONNECT'],place_line:['ACT','PLACE','CONNECT'],derive_actual_cash:['SEE','CONNECT','ACT']};
 const selected=(tags[prompt.skill]||[]).flatMap(t=>all.filter(h=>h.startsWith(t+':')));
 return selected.length?[...new Set([...selected,problem.explanation].filter(Boolean))]:all;
}
export function attemptSnapshot(problem,prompt){
 // Persist the actual source and one prompt; never regenerate fixed lessons as random problems.
 const {id,seed,concept,scaffoldLevel,intro,source,explanation}=problem;
 return JSON.parse(JSON.stringify({id,seed,concept,scaffoldLevel,intro,source,explanation,prompts:[prompt],hints:hintsFor(problem,prompt)}));
}
export function recordedProblem(attempt){return attempt.problemSnapshot||null;}
export function independentAttempt(a){
 const oldSale=['gain_on_sale','loss_on_sale'].includes(a.concept)&&a.contentVersion==='2026.10.13.1';
 return a.scaffoldLevel>=2&&!a.guided&&!oldSale;
}
