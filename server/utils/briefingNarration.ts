import type { DailyBriefing } from './dailyBriefing'

/**
 * ============================================================================
 * OPTIONAL AI NARRATION LAYER
 * ============================================================================
 * Turns the deterministic briefing into a warmer, more natural summary using
 * an LLM — but ONLY if a key is configured. If no key is present (or the call
 * fails for any reason), we silently fall back to the deterministic headline
 * the engine already produced. The app is fully functional with no AI at all.
 *
 * Supported out of the box: Anthropic (ANTHROPIC_API_KEY) or OpenAI
 * (OPENAI_API_KEY). Whichever is set wins; Anthropic takes precedence.
 *
 * IMPORTANT: this only ever *rephrases* the summary line. It is never given
 * authority to invent leads, change counts, or contact anyone. Pure cosmetics
 * over data we already computed — safe by construction.
 * ============================================================================
 */

function buildPrompt(briefing: DailyBriefing): string {
  const { totals, leads } = briefing
  // Give the model just the shape of the day, not PII beyond first names.
  const sample = leads.slice(0, 5).map((l) => {
    const first = (l.name || 'A lead').split(' ')[0]
    return `- ${first}: ${l.reason}`
  })

  return [
    `You are a friendly real-estate assistant writing a one or two sentence morning briefing for a busy realtor.`,
    `Do not invent any leads or numbers. Use ONLY these facts.`,
    ``,
    `Counts today: ${totals.new} new, ${totals.overdue} overdue follow-ups, ${totals.cold} going cold (${totals.total} total needing attention).`,
    sample.length ? `Top items:\n${sample.join('\n')}` : `No leads need attention today.`,
    ``,
    `Write an encouraging, concrete summary. No greeting, no sign-off, no markdown. Max 2 sentences.`
  ].join('\n')
}

async function narrateWithAnthropic(
  briefing: DailyBriefing,
  apiKey: string
): Promise<string | null> {
  try {
    const res = await $fetch<any>('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: {
        model: 'claude-3-5-haiku-latest',
        max_tokens: 150,
        messages: [{ role: 'user', content: buildPrompt(briefing) }]
      }
    })
    const text = res?.content?.find((b: any) => b.type === 'text')?.text
    return typeof text === 'string' && text.trim() ? text.trim() : null
  } catch (err) {
    console.error('Anthropic narration failed, using deterministic headline:', err)
    return null
  }
}

async function narrateWithOpenAI(
  briefing: DailyBriefing,
  apiKey: string
): Promise<string | null> {
  try {
    const res = await $fetch<any>('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json'
      },
      body: {
        model: 'gpt-4o-mini',
        max_tokens: 150,
        messages: [{ role: 'user', content: buildPrompt(briefing) }]
      }
    })
    const text = res?.choices?.[0]?.message?.content
    return typeof text === 'string' && text.trim() ? text.trim() : null
  } catch (err) {
    console.error('OpenAI narration failed, using deterministic headline:', err)
    return null
  }
}

/**
 * Returns an AI-written headline if a provider is configured and succeeds,
 * otherwise returns null so the caller keeps the deterministic one.
 */
export async function narrateBriefing(
  briefing: DailyBriefing
): Promise<string | null> {
  // Nothing to narrate if the day is empty — deterministic line is perfect.
  if (briefing.totals.total === 0) return null

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (anthropicKey) return narrateWithAnthropic(briefing, anthropicKey)
  if (openaiKey) return narrateWithOpenAI(briefing, openaiKey)

  // No provider configured — that's fine, this feature is opt-in.
  return null
}
