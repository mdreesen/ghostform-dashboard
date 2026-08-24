export interface BUY {
  q_timeline?: string;
  q_financing?: string;
  q_lender?: string;
  q_budget_max?: string;
  q_must_haves?: string;
  q_deal_breakers?: string;
  q_current_situation?: string;
  q_areas?: string;
}

export interface SELL {
  q_timeline?: string;
  q_reason?: string;
  q_price_expectation?: string;
  q_price_basis?: string;
  q_mortgage?: string;
  q_condition?: string;
  q_improvements?: string;
  q_listed_before?: string;
  q_buying_too?: string;
  q_flexibility?: string;
  q_decision?: string;
}