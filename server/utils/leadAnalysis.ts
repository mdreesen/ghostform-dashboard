/**
 * ============================================================================
 * LEAD ANALYSIS
 * ============================================================================
 * Runs ONLY after a lead has completed the qualification questionnaire. This
 * is the distinction that makes it worth doing: analysing a name and a price
 * range produces generic filler, but analysing twelve considered answers
 * produces something a realtor can act on.
 *
 * TWO LAYERS, DELIBERATELY
 *
 *   1. A DETERMINISTIC scorecard computed in code — readiness, financing risk,
 *      timeline. These are the numbers a realtor might act on, so they must be
 *      reproducible and explainable, not a model's opinion that changes between
 *      runs. If the AI is unavailable, this still works.
 *
 *   2. An AI-written READ over the free-text answers — contradictions, what to
 *      do next, what is still unknown. This is where a model genuinely adds
 *      value, because it is reading prose rather than scoring fields.
 *
 * FAIR HOUSING — THE NON-NEGOTIABLE PART
 * This feature analyses a *person*, which is precisely where fair-housing
 * problems come from. The prompt forbids any inference about protected
 * classes, and the output is filtered again after generation. "Likely a
 * growing family — suggest school districts" is exactly the sentence that ends
 * up in a complaint, and a model will write it helpfully if you let it.
 * ============================================================================
 */

export interface QualAnswers { [key: string]: string | number | undefined }

export interface Scorecard {
  readiness: number          // 0-100
  readinessLabel: string
  financingRisk: 'low' | 'medium' | 'high' | 'unknown'
  timelineBand: string
  signals: string[]          // plain-language, each traceable to an answer
  gaps: string[]             // what they haven't told you yet
}

export interface LeadAnalysis {
  scorecard: Scorecard
  read: string | null        // AI prose, or null when unavailable
  nextSteps: string[]
  source: 'ai' | 'scorecard-only'
  generatedAt: string
}

/* ------------------------------------------------------------------ scoring */

const TIMELINE_SCORE: Record<string, number> = {
  'within 30 days': 30,
  'as soon as possible': 30,
  '1–3 months': 24,
  '3–6 months': 15,
  '6–12 months': 8,
  'just exploring': 2,
  'just considering': 2
}

const FINANCING_SCORE: Record<string, number> = {
  'paying cash': 30,
  'fully pre-approved': 28,
  'pre-qualified, not yet approved': 18,
  'talked to a lender, nothing formal': 9,
  "haven't started": 2
}

const norm = (v: unknown) => String(v ?? '').trim().toLowerCase()
const has = (v: unknown) => String(v ?? '').trim().length > 0

/**
 * Deterministic scorecard. Every point is traceable to a specific answer —
 * a realtor should be able to ask "why is this 72?" and get a real answer.
 */
export function buildScorecard(a: QualAnswers, intent: string): Scorecard {
  const isSeller = norm(intent).includes('sell')
  let score = 0
  const signals: string[] = []
  const gaps: string[] = []

  // --- Timeline (max 30) ---
  const t = norm(a.q_timeline)
  const tScore = TIMELINE_SCORE[t] ?? 0
  score += tScore
  if (tScore >= 24) signals.push(`Moving fast — said "${a.q_timeline}".`)
  else if (tScore <= 2 && has(a.q_timeline)) signals.push('Exploratory timeline — not ready to transact yet.')
  if (!has(a.q_timeline)) gaps.push('No timeline given.')

  // --- Financing / price realism (max 30) ---
  let financingRisk: Scorecard['financingRisk'] = 'unknown'
  if (!isSeller) {
    const f = norm(a.q_financing)
    const fScore = FINANCING_SCORE[f] ?? 0
    score += fScore
    if (fScore >= 28) { financingRisk = 'low'; signals.push('Financing is sorted — cash or fully pre-approved.') }
    else if (fScore >= 18) { financingRisk = 'medium'; signals.push('Pre-qualified only — not the same as approved.') }
    else if (has(a.q_financing)) { financingRisk = 'high'; signals.push('Financing not started or informal — the most likely thing to stall this.') }
    else gaps.push('Financing status unknown.')

    if (!has(a.q_lender) && financingRisk !== 'low') {
      gaps.push('No lender named — an introduction would move this forward.')
    }
  } else {
    // Sellers: the equivalent risk is a price expectation the market won't meet.
    const expected = Number(a.q_price_expectation) || 0
    const owed = Number(a.q_mortgage) || 0
    if (expected > 0) {
      score += 18
      signals.push(`Has a price in mind: $${expected.toLocaleString('en-US')}.`)
      if (owed > 0 && owed > expected * 0.9) {
        financingRisk = 'high'
        signals.push('Owes close to (or more than) their expected price — equity may not support a sale.')
      } else if (owed > 0) {
        financingRisk = 'low'
        score += 6
      }
    } else {
      gaps.push('No price expectation given — that is the listing conversation.')
    }
    if (!has(a.q_price_basis)) gaps.push("Unclear where their price expectation comes from.")
  }

  // --- Motivation (max 20) ---
  const motivation = String(a.q_reason ?? a.q_motivation ?? '')
  if (motivation.trim().length > 40) {
    score += 20
    signals.push('Gave a detailed reason for moving — usually a sign of real intent.')
  } else if (motivation.trim().length > 0) {
    score += 10
  } else {
    gaps.push('No stated reason for moving.')
  }

  // --- Engagement depth (max 20) ---
  const longAnswers = [a.q_must_haves, a.q_deal_breakers, a.q_seen_anything, a.q_condition, a.q_improvements, a.q_flexibility]
    .filter((v) => String(v ?? '').trim().length > 25).length
  score += Math.min(20, longAnswers * 7)
  if (longAnswers >= 3) signals.push('Answered the open questions thoroughly — engaged, not just curious.')
  if (longAnswers === 0) gaps.push('Skipped most of the open-ended questions.')

  // --- Contingency / complication flags ---
  const situation = norm(a.q_current_situation)
  if (situation.includes('need to sell first')) {
    signals.push('Purchase depends on selling their current home — and that is a second listing for you.')
  }
  if (norm(a.q_listed_before).includes('expired')) {
    signals.push('Previously listed and expired — worth knowing why before the appointment.')
  }
  if (norm(a.q_buying_too).startsWith('yes')) {
    signals.push('Buying as well as selling — two transactions.')
  }
  if (has(a.q_decision) && !/^(no|none|just me|myself)/i.test(String(a.q_decision).trim())) {
    signals.push(`Someone else is involved in the decision: ${a.q_decision}.`)
  }
  if (has(a.q_concerns)) {
    signals.push('Raised a concern unprompted — address it directly on the next call.')
  }

  score = Math.max(0, Math.min(100, score))

  const readinessLabel =
    score >= 75 ? 'Ready to transact' :
    score >= 50 ? 'Getting serious' :
    score >= 25 ? 'Early but real' :
                  'Exploratory'

  return {
    readiness: score,
    readinessLabel,
    financingRisk,
    timelineBand: String(a.q_timeline ?? 'Not given'),
    signals,
    gaps
  }
}

/* ------------------------------------------------------------ fair housing */

/**
 * Protected-class language that must never appear in generated output.
 * Checked AFTER generation as well as forbidden in the prompt — a model will
 * write "great for a growing family" helpfully unless you stop it twice.
 */
const FORBIDDEN = [
  // 'family' about PEOPLE is a protected-class reference; 'single-family' and
  // 'multi-family' are property types and must stay allowed.
  /(?<!\b(single|multi)[\s-])\bfamil(y|ies|ial)\b/i,
  /\bkids?\b/i, /\bchildren\b/i, /\bschool district/i,
  /\bmarried\b/i, /\bcouple\b/i,
  // 'single' only when it's about a PERSON — "single-story" and "single-family"
  // are standard architectural terms and must not be flagged.
  /\bsingle\b(?![\s-]*(story|storey|level|family|wide))/i,
  /\bethnic/i, /\brace\b/i, /\bracial/i, /\breligio/i, /\bchurch\b/i,
  /\bnationalit/i, /\bimmigran/i, /\bdisab/i, /\bhandicap/i, /\belderly\b/i,
  /\byoung professional/i, /\bretire(d|e|ment)\b/i, /\bpregnan/i,
  /\bsafe neighborhood/i, /\bgood area for\b/i
]

function violatesFairHousing(text: string): string | null {
  for (const re of FORBIDDEN) {
    const m = text.match(re)
    if (m) return m[0]
  }
  return null
}

/* ----------------------------------------------------------------- the read */

function buildPrompt(a: QualAnswers, intent: string, card: Scorecard, name: string): string {
  const answered = Object.entries(a)
    .filter(([, v]) => String(v ?? '').trim().length > 0)
    .map(([k, v]) => `${k.replace(/^q_/, '').replace(/_/g, ' ')}: ${v}`)
    .join('\n')

  return [
    `You are helping a real estate agent prepare for their next conversation with a lead.`,
    `The lead completed a qualification questionnaire. Their answers are below.`,
    ``,
    `LEAD: ${name || 'the lead'}  (${intent || 'unspecified intent'})`,
    `COMPUTED READINESS: ${card.readiness}/100 — ${card.readinessLabel}`,
    ``,
    `THEIR ANSWERS`,
    answered,
    ``,
    `WRITE`,
    `1. "read" — 3-5 sentences on what is actually going on with this lead.`,
    `   Point out contradictions between answers (e.g. a budget that will not`,
    `   buy the must-haves, an urgent timeline with no financing started).`,
    `   Reference what they actually said. Be direct and useful, not flattering.`,
    `2. "nextSteps" — 2-4 specific actions for the agent, in priority order.`,
    `   Concrete ("introduce a lender this week"), not vague ("build rapport").`,
    ``,
    `HARD RULES`,
    `- Use ONLY what is in their answers. Invent nothing — no prices, dates,`,
    `  or facts they did not give.`,
    `- NEVER mention or infer family status, children, marital status, age,`,
    `  race, ethnicity, national origin, religion, or disability. Do not`,
    `  reference schools, "family-friendly", "safe neighborhoods", or anything`,
    `  that stands in for those. This is a legal requirement, not a preference.`,
    `- Do not speculate about their personal circumstances beyond what the`,
    `  answers state about the transaction.`,
    ``,
    `Return ONLY JSON, no markdown fence:`,
    `{"read": "...", "nextSteps": ["...", "..."]}`
  ].join('\n')
}

async function callAnthropic(prompt: string, key: string): Promise<string | null> {
  try {
    const res = await $fetch<any>('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: {
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }]
      }
    })
    return res?.content?.find((b: any) => b.type === 'text')?.text ?? null
  } catch (err: any) {
    if (String(err).includes('404')) {
      console.error('[analysis] 404 from Anthropic — check ANTHROPIC_MODEL is a model this key can access.')
    } else {
      console.error('[analysis] Anthropic failed:', err?.message || err)
    }
    return null
  }
}

async function callOpenAI(prompt: string, key: string): Promise<string | null> {
  try {
    const res = await $fetch<any>('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: { model: 'gpt-4o-mini', max_tokens: 800, messages: [{ role: 'user', content: prompt }] }
    })
    return res?.choices?.[0]?.message?.content ?? null
  } catch (err: any) {
    console.error('[analysis] OpenAI failed:', err?.message || err)
    return null
  }
}

function parseJson(raw: string): { read: string; nextSteps: string[] } | null {
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim()
    const s = cleaned.indexOf('{'), e = cleaned.lastIndexOf('}')
    if (s === -1 || e === -1) return null
    const p = JSON.parse(cleaned.slice(s, e + 1))
    if (!p?.read) return null
    return {
      read: String(p.read).trim(),
      nextSteps: Array.isArray(p.nextSteps) ? p.nextSteps.map((x: any) => String(x)).slice(0, 4) : []
    }
  } catch { return null }
}

/**
 * Full analysis. The scorecard always works; the AI read is an upgrade.
 */
export async function analyseLead(
  answers: QualAnswers,
  intent: string,
  name = ''
): Promise<LeadAnalysis> {
  const scorecard = buildScorecard(answers, intent)
  const base: LeadAnalysis = {
    scorecard,
    read: null,
    nextSteps: [],
    source: 'scorecard-only',
    generatedAt: new Date().toISOString()
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY
  if (!anthropicKey && !openaiKey) return base

  const prompt = buildPrompt(answers, intent, scorecard, name)
  const raw = anthropicKey
    ? await callAnthropic(prompt, anthropicKey)
    : await callOpenAI(prompt, openaiKey!)
  if (!raw) return base

  const parsed = parseJson(raw)
  if (!parsed) return base

  // Second fair-housing pass. If the model slipped, drop the prose entirely
  // rather than shipping something a complaint could quote — the scorecard
  // still gives the realtor everything factual.
  const combined = [parsed.read, ...parsed.nextSteps].join(' ')
  const violation = violatesFairHousing(combined)
  if (violation) {
    console.error(`[analysis] Discarded AI read — protected-class language ("${violation}").`)
    return base
  }

  return {
    ...base,
    read: parsed.read,
    nextSteps: parsed.nextSteps,
    source: 'ai'
  }
}
