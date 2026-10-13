// Isolated timing transactions, not complete company statements. Opposite directions
// are separate cases so the learner never has to silently change the original facts.
export const WORKED_STORIES = {
 accounts_receivable: [
  {story:'Beacon earns $1,000 from repair work and collects $700. Customers still owe $300.',income:1000,cash:700,begin:0,end:300,adjustment:-300,why:'Net Income counted $300 that cash has not collected. Subtract the uncollected part.'},
  {story:'Separate case: customers pay the entire $200 they owed at the start. No new work is performed in this example.',income:0,cash:200,begin:200,end:0,adjustment:200,why:'The revenue was recognized last period. Cash arrives now without new revenue, so add the $200 decrease.'}
 ],
 accounts_payable: [
  {story:'Beacon receives a $500 utility bill for service already used, pays $300, and owes the remaining $200.',income:-500,cash:-300,begin:0,end:200,adjustment:200,why:'Expense reduced Net Income by $500, but only $300 left in cash. Add back the $200 not yet paid.'},
  {story:'Separate case: Beacon pays a $200 utility bill owed from last period. There is no new utility expense in this example.',income:0,cash:-200,begin:200,end:0,adjustment:-200,why:'The expense reduced last period’s income. This period has the payment, so subtract the $200 decrease.'}
 ],
 accrued_liabilities: [
  {story:'Employees earn $400 of wages. Beacon pays $300 and still owes $100. Recognize the expense as employees work.',income:-400,cash:-300,begin:0,end:100,adjustment:100,why:'The unpaid $100 reduced Net Income before cash left. Add it back to reach the cash effect.'},
  {story:'Separate case: Beacon pays $100 of wages owed from last period. No additional employee work occurs in this example.',income:0,cash:-100,begin:100,end:0,adjustment:-100,why:'Cash leaves now for an expense already recognized. Subtract the liability decrease.'}
 ],
 unearned_revenue: [
  {story:'Customers pay Beacon $600 in advance. Beacon completes $400 of the promised work; $200 is still unearned.',income:400,cash:600,begin:0,end:200,adjustment:200,why:'Cash includes $200 that is not revenue yet. Add the liability increase to the amount Net Income recognized.'},
  {story:'Separate case: Beacon completes all $200 of work paid for last period. Customers pay nothing new in this example.',income:200,cash:0,begin:200,end:0,adjustment:-200,why:'Net Income now counts $200 whose cash arrived earlier. Subtract the decrease to avoid treating it as current cash.'}
 ],
 prepaid_expenses: [
  {story:'Beacon pays $600 for insurance and uses $400 of coverage. The remaining $200 is a future benefit.',income:-400,cash:-600,begin:0,end:200,adjustment:-200,why:'Cash paid exceeds the expense recognized by $200. Subtract the prepaid increase to reach the cash effect.'},
  {story:'Separate case: Beacon uses all $200 of insurance coverage paid for last period. No new premium is paid.',income:-200,cash:0,begin:200,end:0,adjustment:200,why:'Expense reduced current income without a current payment. Add back the $200 decrease.'}
 ],
 inventory: [
  {story:'Beacon buys $100 of parts for cash and sells none. The cost stays in Inventory; Cost of Goods Sold is zero.',income:0,cash:-100,begin:0,end:100,adjustment:-100,why:'The purchase used $100 cash without reducing Net Income. Subtract the Inventory increase.'},
  {story:'Separate case: $60 of parts bought and paid for last period are sold. Consider only the cost side here; sales revenue and customer collections are handled separately. No replacement inventory is purchased.',income:-60,cash:0,begin:60,end:0,adjustment:60,why:'Cost of Goods Sold reduces income now, but the purchase cash left earlier. Add back the $60 decrease for this cost-side effect.'}
 ]
};
