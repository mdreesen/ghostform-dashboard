import { useOpenAi } from '~/utils/ai/openAi/useOpenAi';

export type Platform = 'facebook' | 'instagram' | 'x'

export interface VoiceProfile {
  tone?: string
  about?: string
  focus?: string
  emoji?: string
  hashtags?: string
  phrases?: string
  avoid?: string
  samples?: string
}

export interface DraftContext {
  agentName?: string
  company?: string
  region?: string
  voice?: VoiceProfile
}

export interface GeneratedPost {
  body: string
  hashtags: string
  imageIdea: string
}

/** The topics a realtor actually posts about, with what each should accomplish. */
export const TOPICS: Record<string, { label: string; brief: string }> = {
  open_house: {
    label: 'Open house this weekend',
    brief: 'Invite people to an upcoming open house. Give a reason to show up beyond the address.'
  },
  just_listed: {
    label: 'New listing',
    brief: 'Announce a new listing. Lead with what makes the home feel like a home, not a spec sheet.'
  },
  just_sold: {
    label: 'Just sold / closed',
    brief: 'Celebrate a closing. Centre the clients, not the agent. No bragging about volume.'
  },
  market_note: {
    label: 'Local market note',
    brief: 'Share one useful observation about the local market. Practical, not doom or hype.'
  },
  tip: {
    label: 'Advice for buyers or sellers',
    brief: 'One genuinely useful tip. Specific enough that it could only come from someone who does this work.'
  },
  personal: {
    label: 'Something personal / local',
    brief: 'A human post about life in the area. Builds familiarity. Real estate stays in the background.'
  },
  testimonial: {
    label: 'Client thank-you',
    brief: 'Thank a client warmly and specifically, without naming private details.'
  }
}

/** Platform norms that meaningfully change the writing. */
const PLATFORM_RULES: Record<Platform, string> = {
  facebook:
    'Facebook: conversational, 2-4 short paragraphs, can be up to ~120 words. Line breaks between thoughts. Ends with a question or an easy invitation to reply. Hashtags are unusual here — use none or one.',
  instagram:
    'Instagram: written to sit under a photo. First line must work as a hook on its own, since the rest is hidden behind "more". 40-80 words. Hashtags go at the end, on their own line.',
  x: 'X: under 260 characters, single thought, no fluff. No "thread" language. At most one hashtag, often none.'
}

function toneLine(tone?: string): string {
  switch (tone) {
    case 'straight': return 'Plain and direct. No exclamation marks. Short sentences.'
    case 'playful': return 'Light and a bit funny. Never goofy or cringe.'
    case 'polished': return 'Composed and professional, but still human. No corporate stiffness.'
    default: return 'Warm and neighbourly. Sounds like a person, not a brand.'
  }
}

function emojiLine(level?: string): string {
  if (level === 'none') return 'Use NO emoji at all.'
  if (level === 'lots') return 'Emoji are welcome — a few, placed naturally.'
  return 'At most one emoji, and only if it genuinely adds something.'
}

function hashtagLine(level?: string, platform?: Platform): string {
  if (level === 'none') return 'No hashtags.'
  if (level === 'many') {
    return platform === 'instagram'
      ? 'Include 8-12 relevant hashtags on their own line at the end.'
      : 'Include 2-3 hashtags at the end.'
  }
  return platform === 'instagram'
    ? 'Include 3-5 relevant hashtags on their own line at the end.'
    : 'Include at most 1 hashtag, or none.'
}

function buildPrompt(
  platform: Platform,
  topicKey: string,
  ctx: DraftContext,
  details?: string
): string {
  const v = ctx.voice || {}
  const topic = TOPICS[topicKey] || TOPICS.personal

  const lines: string[] = [
    `You are ghostwriting a social media post for a real estate agent. It must sound like THEM, not like a marketing template.`,
    ``,
    `AGENT`,
    `- Name: ${ctx.agentName || 'the agent'}`,
    ctx.company ? `- Brokerage: ${ctx.company}` : '',
    ctx.region ? `- Area they serve: ${ctx.region}` : '',
    v.about ? `- About them: ${v.about}` : '',
    v.focus ? `- What they want to be known for: ${v.focus}` : '',
    ``,
    `VOICE`,
    `- ${toneLine(v.tone)}`,
    `- ${emojiLine(v.emoji)}`,
    `- ${hashtagLine(v.hashtags, platform)}`,
    v.phrases ? `- Words and phrases they actually use: ${v.phrases}` : '',
    v.avoid ? `- NEVER use these words or phrases: ${v.avoid}` : '',
    ``
  ]

  if (v.samples?.trim()) {
    lines.push(
      `THEIR REAL POSTS (match this rhythm and vocabulary closely — this is the strongest signal you have):`,
      v.samples.trim(),
      ``
    )
  }

  lines.push(
    `POST TO WRITE`,
    `- Topic: ${topic?.label}`,
    `- Goal: ${topic?.brief}`,
    details ? `- Specific details to use: ${details}` : '',
    ``,
    `PLATFORM`,
    `- ${PLATFORM_RULES[platform]}`,
    ``,
    `RULES`,
    `- Do NOT invent facts: no addresses, prices, square footage, dates, or statistics that weren't given to you.`,
    `- No fair-housing risk: never reference or imply a preferred race, religion, family status, nationality, disability, or "good schools"/"safe neighbourhood" as a proxy for those.`,
    `- Avoid realtor clichés: "Just Listed!!", "Your dream home awaits", "Don't miss out", "DM me".`,
    `- No fake urgency or guarantees about the market.`,
    ``,
    `Return ONLY JSON, no markdown fence:`,
    `{"body": "the post text", "hashtags": "space-separated hashtags or empty string", "imageIdea": "one short line describing the photo to pair with it"}`
  )

  return lines.filter(Boolean).join('\n')
}

function parseJson(raw: string): GeneratedPost | null {
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim()
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start === -1 || end === -1) return null
    const parsed = JSON.parse(cleaned.slice(start, end + 1))
    if (!parsed?.body) return null
    return {
      body: String(parsed.body).trim(),
      hashtags: String(parsed.hashtags || '').trim(),
      imageIdea: String(parsed.imageIdea || '').trim()
    }
  } catch {
    return null
  }
}

/**
 * Deterministic fallback. Deliberately plain — the goal is something the
 * realtor can edit in 20 seconds, not something that pretends to be finished.
 */
function templatePost(
  platform: Platform,
  topicKey: string,
  ctx: DraftContext,
  details?: string
): GeneratedPost {
  const area = ctx.region || 'the area'
  const detail = details?.trim()

  const bodies: Record<string, string> = {
    open_house: `Open house this weekend${detail ? ` — ${detail}` : ` in ${area}`}. Come by, have a look around, ask me anything. No pressure, no sign-in sheet you'll regret.`,
    just_listed: `New listing${detail ? `: ${detail}` : ` in ${area}`}. Happy to walk you through it or send over the details — just say the word.`,
    just_sold: `Keys handed over this week.${detail ? ` ${detail}` : ''} Always a good day when it all comes together for people who deserve it.`,
    market_note: `A quick note on the ${area} market${detail ? `: ${detail}` : '.'} Happy to talk through what it means for your situation specifically.`,
    tip: detail || `One thing I'd tell anyone buying in ${area}: get your financing sorted before you fall in love with a house. It changes what you can move on.`,
    personal: detail || `One of the things I like about working in ${area} is that you run into people you know everywhere you go.`,
    testimonial: `Grateful for the folks who trusted me with this one.${detail ? ` ${detail}` : ''} It genuinely doesn't get old.`
  }

  let body = bodies[topicKey] || bodies.personal!
  if (platform === 'x' && body.length > 255) body = body.slice(0, 252) + '…'

  const tags =
    ctx.voice?.hashtags === 'none'
      ? ''
      : platform === 'instagram'
        ? `#${area.replace(/[^a-zA-Z]/g, '')}RealEstate #MontanaHomes #LocalRealtor`
        : ''

  return {
    body,
    hashtags: tags,
    imageIdea:
      topicKey === 'personal'
        ? 'A real photo from your day — not a stock image.'
        : 'A bright, straight-on photo of the home or street.'
  }
}

/**
 * Generate `count` post variations. Returns template drafts when no AI key is
 * configured, so the feature is never dead.
 */
export async function generateSocialPosts(
  platform: Platform,
  topicKey: string,
  ctx: DraftContext,
  opts: { count?: number; details?: string } = {}
): Promise<{ posts: GeneratedPost[]; source: 'ai' | 'template' }> {
  const count = Math.min(Math.max(opts.count ?? 3, 1), 5);

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (anthropicKey || openaiKey) {
    const prompt = buildPrompt(platform, topicKey, ctx, opts.details)
    const results: GeneratedPost[] = []

    // Separate calls give genuinely different angles; asking for N in one
    // response tends to produce three rewordings of the same sentence.
    for (let i = 0; i < count; i++) {
      const variation = i === 0
        ? prompt
        : `${prompt}\n\nWrite a DIFFERENT post from the one you'd write first — a different angle or opening entirely.`

      const raw = await useOpenAi([{ role: 'user', content: variation }])

      const parsed = raw ? parseJson(raw) : null
      if (parsed) results.push(parsed)
    }

    if (results.length) return { posts: results, source: 'ai' }
  }

  return {
    posts: [templatePost(platform, topicKey, ctx, opts.details)],
    source: 'template'
  }
}
