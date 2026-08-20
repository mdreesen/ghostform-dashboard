import { useOpenAi } from '~/utils/ai/openAi/useOpenAi';

export interface DraftInput {
  name?: string
  budget?: number
  price?: number
  want_to_move?: string
  buy_sell_both?: string
  bedrooms?: number
  address?: string
  status?: string
  lastContactedAt?: string | Date | null
  agentName?: string
}

export type DraftChannel = 'sms' | 'email'

function firstName(name?: string): string {
  if (!name) return 'there'
  return name.split(' ')[0] || 'there'
}

function money(n?: number): string | null {
  if (!n || n <= 0) return null
  return '$' + n.toLocaleString('en-US')
}

/**
 * Deterministic template draft. Always available, no AI, no cost. Pulls in
 * whatever real details we have so it never reads generic.
 */
export function templateDraft(lead: DraftInput, channel: DraftChannel): string {
  const fn = firstName(lead.name)
  const agent = lead.agentName || 'your agent'
  const budget = money(lead.budget) || money(lead.price)
  const intent = (lead.buy_sell_both || '').toLowerCase()

  // Build a short "what they wanted" clause from real fields.
  const bits: string[] = []
  if (budget) bits.push(`around ${budget}`)
  if (lead.bedrooms) bits.push(`${lead.bedrooms}-bed`)
  if (lead.want_to_move) bits.push(`a ${lead.want_to_move.toLowerCase()} timeline`)
  const detail = bits.length ? ` (${bits.join(', ')})` : ''

  if (channel === 'sms') {
    // Short, punchy, no signature line - it's a text.
    if (intent.includes('sell')) {
      return `Hi ${fn}, it's ${agent}. Wanted to check in on your plans to sell${detail}. A couple of things are moving in the market right now — want me to pull a quick value estimate for you?`
    }
    return `Hi ${fn}, it's ${agent}. Thinking about your home search${detail} — a few new options just came up that might be a fit. Want me to send them over?`
  }

  // Email style - a touch longer, with greeting + sign-off.
  const opener = intent.includes('sell')
    ? `I wanted to follow up on your plans to sell${detail}.`
    : `I wanted to follow up on your home search${detail}.`
  return (
    `Hi ${fn},\n\n` +
    `${opener} A few things have shifted in the local market recently and I think it's worth a quick catch-up.\n\n` +
    `Do you have a few minutes this week? Just reply here and we'll find a time.\n\n` +
    `Best,\n${lead.agentName || ''}`
  )
}

function buildPrompt(lead: DraftInput, channel: DraftChannel): string {
  const facts: string[] = []
  facts.push(`Lead first name: ${firstName(lead.name)}`)
  if (money(lead.budget)) facts.push(`Budget: ${money(lead.budget)}`)
  else if (money(lead.price)) facts.push(`Approx price point: ${money(lead.price)}`)
  if (lead.want_to_move) facts.push(`Timeline to move: ${lead.want_to_move}`)
  if (lead.buy_sell_both) facts.push(`Buying/selling: ${lead.buy_sell_both}`)
  if (lead.bedrooms) facts.push(`Bedrooms wanted: ${lead.bedrooms}`)
  facts.push(`Realtor's name: ${lead.agentName || 'the agent'}`)

  const channelRule =
    channel === 'sms'
      ? `Write it as a SHORT text message (under 40 words). No greeting line, no signature, no subject. Warm, direct, one clear question or call to action.`
      : `Write it as a brief email (under 90 words). Include a "Hi <name>," greeting and a short sign-off with the realtor's name. One clear call to action.`

  return [
    `You are helping a real estate agent write a personal outreach message to a lead.`,
    `Use ONLY these facts. Do not invent listings, prices, or promises. Do not make guarantees about the market.`,
    ``,
    facts.join('\n'),
    ``,
    channelRule,
    `Sound like a real person, not a marketing blast. No markdown, no emojis. Return only the message text.`
  ].join('\n')
};

export async function generateLeadDraft(
  lead: DraftInput,
  channel: DraftChannel = 'sms'
): Promise<{ message: string; source: 'ai' | 'template' }> {

  let aiText: string | null = null
  aiText = await useOpenAi([{ role: 'user', content: buildPrompt(lead, channel) }])

  if (aiText) return { message: aiText, source: 'ai' }
  return { message: templateDraft(lead, channel), source: 'template' }
}
