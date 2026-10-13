export const MODULES = [
 ['cash_change','Foundation','The Cash Mystery','Explain the change in Cash.','The statement tells us why Cash moved.','You can distinguish ending Cash from its change.'],
 ['three_sections','Foundation','The Three Sections','Sort the reasons cash moves.','Three stories explain the cash change.','You can place normal business, long-term assets, and lender/owner cash.'],
 ['indirect_bridge','Foundation','Why Operating Is Different','Connect accrual Net Income to cash.','Recognized revenue is not always cash collected.','You can explain why the indirect method needs adjustments.'],
 ['accounts_receivable','Operating · Timing','Accounts Receivable'],['accounts_payable','Operating · Timing','Accounts Payable'],['accrued_liabilities','Operating · Timing','Accrued Liabilities'],
 ['recognition_mirror','Operating · Timing','Recognition First','Compare revenue-first and expense-first stories.','The same timing gap affects revenue and expense differently.','You can explain why A/R and A/P increases have opposite adjustments.'],
 ['unearned_revenue','Operating · Timing','Unearned Revenue'],['prepaid_expenses','Operating · Timing','Prepaid Expenses'],
 ['cash_mirror','Operating · Timing','Cash First','Compare customer deposits and prepayments.','Cash can arrive or leave before recognition.','You can place a story in the timing matrix.'],
 ['inventory','Operating · Timing','Inventory'],
 ['timing_connections','Operating · Timing','Put Timing Together','Combine inventory with payables.','One transaction can create two adjustments.','You can show why a credit inventory purchase has zero net cash effect.'],
 ['depreciation','Operating · Noncash','Noncash Items','Reverse noncash expenses in the reconciliation.','Depreciation reduces income without current cash leaving.','You can explain the add-back and keep purchases in Investing.'],
 ['gain_on_sale','Operating · Gains / losses','Gains & Losses','Separate the sale’s income effect from proceeds.','The equipment sale’s cash belongs in Investing.','You can remove gains/losses from Operating and report actual proceeds in Investing.'],
 ['ppe_purchase','Investing','Follow the Asset Cash','Use long-term assets and supplemental facts.','A change in Equipment is a clue, not a cash receipt.','You can find actual purchases and sale proceeds.'],
 ['borrowing','Financing','Follow Lenders & Owners','Use debt, equity, and supplemental facts.','Borrowing and stock issuance are not revenue.','You can place borrowing, principal, stock, and dividends.'],
 ['noncash_investing_financing','Boundary','Did Cash Move?','Identify noncash investing and financing.','The statement reports cash movements.','You can disclose equipment acquired with a note separately.']
].map(([id,group,title,what,why,know])=>({id,group,title,what,why,know}));
export function curriculum(config={}) {return MODULES.filter(m=>!(m.id==='accrued_liabilities'&&config.curriculum?.includeAccruedLiabilities===false)&&!(m.id==='inventory'&&config.curriculum?.includeInventory===false)&&!(m.id==='noncash_investing_financing'&&config.curriculum?.includeNoncashDisclosure===false));}
