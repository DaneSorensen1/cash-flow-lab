import {esc,money} from '../utils.js';
import {TIMING,conceptName} from '../curriculum/concepts.js';
import {WORKED_STORIES} from '../curriculum/worked-stories.js';

export function workedStoryHTML(concept,config={}){
 const cases=WORKED_STORIES[concept],c=TIMING[concept];
 if(!cases||!c)return '';
 const name=conceptName(concept,config);
 const card=(x,i)=>`<section class="worked-case"><div class="eyebrow">${i?'Separate example · decrease':'First example · increase'}</div><p>${esc(x.story)}</p><div class="worked-table"><table><caption>Beacon · this example only</caption><thead><tr><th scope="col">Evidence</th><th scope="col">Amount</th></tr></thead><tbody><tr><th scope="row">Income Statement: effect on Net Income</th><td>${money(x.income)}</td></tr><tr><th scope="row">Actual cash ${x.cash<0?'paid':'received'}</th><td>${money(x.cash)}</td></tr><tr><th scope="row">Balance Sheet: beginning ${esc(name)}</th><td>${money(x.begin)}</td></tr><tr><th scope="row">Balance Sheet: ending ${esc(name)}</th><td>${money(x.end)}</td></tr></tbody></table></div><p class="worked-equation">Income effect ${money(x.income)} ${x.adjustment<0?'−':'+'} adjustment ${money(Math.abs(x.adjustment))} = cash effect ${money(x.cash)}</p><p><b>Why:</b> ${esc(x.why)}</p><p class="small"><b>Place:</b> ${x.adjustment<0?'Subtract':'Add'} ${money(Math.abs(x.adjustment))} in Operating.</p></section>`;
 return `<div class="worked-story"><div class="timeline">${esc(c.timeline)}</div><p class="small"><b>Where:</b> Comparative Balance Sheet → ${esc(c.territory)} → ${esc(name)}.</p>${card(cases[0],0)}<details class="worked-reverse"><summary>Now compare a separate decrease example</summary>${card(cases[1],1)}</details><p class="small">Parentheses mean a decrease or cash outflow. These are effects of the stated example, not the company’s total Net Income or total operating cash flow.</p></div>`;
}
