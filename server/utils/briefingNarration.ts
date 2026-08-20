import type { DailyBriefing } from './dailyBriefing'
import { useOpenAi } from '~/utils/ai/openAi/useOpenAi';

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
};

export async function narrateBriefing(
  briefing: DailyBriefing
): Promise<string | null> {
  // Nothing to narrate if the day is empty — deterministic line is perfect.
  if (briefing.totals.total === 0) return null

  return useOpenAi([{ role: 'user', content: buildPrompt(briefing) }]) ?? null
};
