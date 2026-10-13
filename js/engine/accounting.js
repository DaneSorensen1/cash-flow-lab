const assets=new Set(['accounts_receivable','inventory','prepaid_expenses']);
const liabilities=new Set(['accounts_payable','accrued_liabilities','unearned_revenue']);
export const computeChange=(begin,end)=>end-begin;
export function workingCapitalAdjustment(concept,change){if(assets.has(concept))return -change;if(liabilities.has(concept))return change;throw new Error('Not an operating timing account: '+concept);}
export function gainLossAdjustment(kind,amount){if(!['gain','loss'].includes(kind)||amount<0)throw new Error('Invalid gain/loss');return kind==='gain'?-amount:amount;}
export function sale(cost,accumulated,proceeds){if(cost<0||accumulated<0||accumulated>cost||proceeds<0)throw new Error('Invalid sale');const book=cost-accumulated;return {book, gain:proceeds-book, operating:book-proceeds, investing:proceeds};}
export const depreciationAdjustment=expense=>expense;
export const cashChange=(operating,investing,financing)=>operating+investing+financing;
export const reconcileCash=(begin,net)=>begin+net;
export function classify(kind){const map={customer:'operating',wages:'operating',interest:'operating',ppe_purchase:'investing',ppe_sale:'investing',land:'investing',borrowing:'financing',debt_repayment:'financing',stock_issuance:'financing',dividends:'financing',noncash_investing_financing:'disclosure'};if(!map[kind])throw new Error('Unknown transaction');return map[kind];}
export function totals(lines){const result={operating:0,investing:0,financing:0};for(const l of lines){if(Object.hasOwn(result,l.section))result[l.section]+=l.amount;}result.net=cashChange(result.operating,result.investing,result.financing);return result;}
