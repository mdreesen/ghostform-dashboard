/**
 * ============================================================================
 * QUALIFICATION QUESTION SETS
 * ============================================================================
 * Sent to a lead once they're getting serious. Deliberately different from the
 * open-house capture form: that one is short because a stranger will abandon
 * anything longer. This one is longer because someone genuinely considering a
 * move will answer real questions — and those answers are what make analysis
 * worth doing at all.
 *
 * WHAT IS DELIBERATELY NOT ASKED
 * No questions about family size, children, marital status, religion,
 * national origin, age, or disability. Not because a lead wouldn't answer —
 * many would volunteer it — but because collecting it creates a written
 * record that a fair-housing complaint can point at. If a lead mentions it
 * unprompted in a free-text field, that's their choice; asking is ours.
 * ============================================================================
 */

export interface QualQuestion {
  id: string
  label: string
  /** 'text' | 'choice' | 'number' | 'long' */
  type: 'text' | 'choice' | 'number' | 'long'
  options?: string[]
  /** why this question earns its place — shown to the realtor, not the lead */
  rationale: string
}

export const BUYER_QUESTIONS: QualQuestion[] = [
  {
    id: 'q_timeline',
    label: 'When would you ideally like to be in a new place?',
    type: 'choice',
    options: ['Within 30 days', '1–3 months', '3–6 months', '6–12 months', 'Just exploring'],
    rationale: 'The single strongest predictor of whether this closes.'
  },
  {
    id: 'q_financing',
    label: 'Where are you at with financing?',
    type: 'choice',
    options: [
      'Paying cash',
      'Fully pre-approved',
      'Pre-qualified, not yet approved',
      'Talked to a lender, nothing formal',
      "Haven't started"
    ],
    rationale: 'Financing is the most common deal-killer. Knowing this early changes everything.'
  },
  {
    id: 'q_lender',
    label: 'Who are you working with for the loan? (if anyone)',
    type: 'text',
    rationale: 'Tells you whether to introduce a lender, and how real the pre-approval is.'
  },
  {
    id: 'q_budget_max',
    label: 'What is the most you would be comfortable spending?',
    type: 'number',
    rationale: 'Their ceiling, not their wish price. Different number than the capture form.'
  },
  {
    id: 'q_must_haves',
    label: 'What are your absolute must-haves?',
    type: 'long',
    rationale: 'Separates real constraints from preferences. Drives what you send them.'
  },
  {
    id: 'q_deal_breakers',
    label: 'What would rule a house out completely?',
    type: 'long',
    rationale: 'Saves showings. Most agents never ask this and waste weekends because of it.'
  },
  {
    id: 'q_current_situation',
    label: 'What is your current living situation?',
    type: 'choice',
    options: [
      'Renting — lease ends soon',
      'Renting — flexible',
      'Own, need to sell first',
      'Own, do not need to sell first',
      'Other'
    ],
    rationale: 'A contingent sale is a completely different transaction. Also surfaces listing opportunities.'
  },
  {
    id: 'q_areas',
    label: 'Which areas are you considering?',
    type: 'text',
    rationale: 'Grounds your search and tells you if expectations match the budget.'
  },
  {
    id: 'q_seen_anything',
    label: 'Have you seen anything you liked so far?',
    type: 'long',
    rationale: 'Reveals how far along they are and what actually appeals to them.'
  },
  {
    id: 'q_decision',
    label: 'Is anyone else involved in the decision?',
    type: 'text',
    rationale: 'Deals stall when the person you never met says no. Neutral phrasing — not a question about household composition.'
  },
  {
    id: 'q_motivation',
    label: 'What is prompting the move?',
    type: 'long',
    rationale: 'Motivation strength predicts follow-through better than budget does.'
  },
  {
    id: 'q_concerns',
    label: 'Anything worrying you about the process?',
    type: 'long',
    rationale: 'Surfaces objections early, while you can still address them.'
  }
]

export const SELLER_QUESTIONS: QualQuestion[] = [
  {
    id: 'q_timeline',
    label: 'When would you like to have it sold?',
    type: 'choice',
    options: ['As soon as possible', '1–3 months', '3–6 months', '6–12 months', 'Just considering'],
    rationale: 'Urgency drives pricing strategy and how hard you push.'
  },
  {
    id: 'q_reason',
    label: 'What is prompting the sale?',
    type: 'long',
    rationale: 'A forced move and a maybe-move need completely different handling.'
  },
  {
    id: 'q_price_expectation',
    label: 'What do you think the home is worth?',
    type: 'number',
    rationale: 'The most important number in the conversation. Gap vs market is the whole listing appointment.'
  },
  {
    id: 'q_price_basis',
    label: 'What is that based on?',
    type: 'text',
    rationale: 'A Zillow estimate and a recent appraisal are very different starting points.'
  },
  {
    id: 'q_mortgage',
    label: 'Roughly how much is still owed on the property?',
    type: 'number',
    rationale: 'Determines whether the sale is even viable at their expected price.'
  },
  {
    id: 'q_condition',
    label: 'What condition is it in? Anything that needs work?',
    type: 'long',
    rationale: 'Sets expectations on price and prep before you walk in.'
  },
  {
    id: 'q_improvements',
    label: 'What have you updated while you have owned it?',
    type: 'long',
    rationale: 'Ammunition for pricing, and it gets sellers talking positively.'
  },
  {
    id: 'q_listed_before',
    label: 'Has it been listed before?',
    type: 'choice',
    options: ['No', 'Yes — expired', 'Yes — withdrew it', 'Yes — currently listed'],
    rationale: 'A previously expired listing tells you a lot before you arrive.'
  },
  {
    id: 'q_buying_too',
    label: 'Are you buying something else as well?',
    type: 'choice',
    options: ['Yes, locally', 'Yes, out of the area', 'No', 'Not sure yet'],
    rationale: 'Doubles the transaction, and changes the timing conversation.'
  },
  {
    id: 'q_flexibility',
    label: 'How flexible are you on timing and price?',
    type: 'long',
    rationale: 'Tells you whether this is a real listing or a test of the market.'
  },
  {
    id: 'q_decision',
    label: 'Is anyone else involved in the decision?',
    type: 'text',
    rationale: 'Same reason as the buyer set — deals stall on the person you never met.'
  },
  {
    id: 'q_concerns',
    label: 'Anything worrying you about selling?',
    type: 'long',
    rationale: 'Objections surfaced early are objections you can still answer.'
  }
]

export function questionsFor(intent: string): QualQuestion[] {
  const i = (intent || '').toLowerCase()
  if (i.includes('sell')) return SELLER_QUESTIONS
  return BUYER_QUESTIONS
}
