/**
 * ============================================================================
 * VOICE INTENT
 * ============================================================================
 * One spoken input, three possible outcomes:
 *
 *   "Buyers loved the kitchen, worried about the roof"      → NOTE
 *   "When's the inspection deadline on Whitefish Stage?"    → QUESTION
 *   "Remind me to call the Chens Thursday"                  → REMINDER
 *   "Showing went well — remind me to send comps tomorrow"  → MIXED
 *
 * A realtor talking into a phone in a truck won't announce which one they're
 * doing, so the app has to work it out. Getting this wrong in the safe
 * direction (treating a reminder as a note) loses a nudge; getting it wrong the
 * other way (inventing a reminder from an offhand remark) puts noise in their
 * morning, which is worse.
 *
 * Everything it produces is a PROPOSAL. Same rule as extracted contract dates:
 * the AI heard what the browser heard, so a misheard "Thursday" would be a
 * missed call. Nothing becomes live until the realtor confirms it.
 * ============================================================================
 */

export interface ExtractedReminder {
  text: string
  dueAt: string          // ISO date
  priority: 'high' | 'medium' | 'low'
  /** The words this came from, so they can check what we heard. */
  heardAs: string
}

export interface VoiceAnalysis {
  intent: 'note' | 'question' | 'reminder' | 'mixed' | 'unclear'
  /** Cleaned-up note text, when there's something worth keeping. */
  note: string
  /** The question asked, when there is one. */
  question: string
  reminders: ExtractedReminder[]
}

export function buildIntentPrompt(transcript: string, today: string, context: string): string {
  return [
    `A real estate agent spoke this into their phone. Work out what they wanted.`,
    ``,
    `THEY SAID: "${transcript}"`,
    `TODAY: ${today}`,
    context ? `\nTHEIR CURRENT WORK:\n${context}` : '',
    ``,
    `Classify it as ONE of:`,
    `  note     — an observation to keep. "Buyers loved the kitchen."`,
    `  question — they want an answer. "When's the inspection deadline?"`,
    `  reminder — they want a nudge later. "Remind me to call them Thursday."`,
    `  mixed    — a note AND a reminder, or a note AND a question.`,
    `  unclear  — you genuinely can't tell.`,
    ``,
    `FOR REMINDERS, extract each one:`,
    `  text     — what to do, in their words, as an instruction.`,
    `             "Call the Chens about the inspection" — not "reminder to call".`,
    `  dueAt    — ISO YYYY-MM-DD. Resolve relative words against TODAY:`,
    `             "tomorrow", "Thursday", "next week", "in three days".`,
    `             If NO time was given at all, use tomorrow and say so in heardAs.`,
    `  priority — high if they said urgent/important/first thing, else medium.`,
    `  heardAs  — the exact fragment you took it from, VERBATIM. This is how`,
    `             they check whether you heard the day right.`,
    ``,
    `RULES`,
    `- Do NOT invent a reminder from an offhand remark. "I should probably`,
    `  follow up sometime" is a note, not a reminder. Only create one when they`,
    `  clearly asked to be reminded or named a task and a time.`,
    `- Do NOT answer the question here — just identify it. Something else`,
    `  answers it against their real data.`,
    `- Keep the note in THEIR words. Tidy the grammar, don't rewrite the`,
    `  meaning, and never add detail they didn't say.`,
    `- Speech-to-text mishears names and streets. If a word looks garbled,`,
    `  leave it as heard rather than guessing at a correction.`,
    ``,
    `Return ONLY JSON, no fence:`,
    `{"intent":"mixed","note":"...","question":"...","reminders":[{"text":"...",`,
    `"dueAt":"YYYY-MM-DD","priority":"medium","heardAs":"..."}]}`
  ].filter(Boolean).join('\n')
}

/** Resolve a spoken day into a date, for validating what the model returned. */
export function plausibleDate(iso: string, today = new Date()): boolean {
  const t = Date.parse(iso)
  if (Number.isNaN(t)) return false
  const days = Math.round((t - today.setHours(0, 0, 0, 0)) / 86400000)
  // A reminder more than a year out, or in the past, is almost certainly a
  // misparse rather than a real intention.
  return days >= 0 && days <= 365
}

export function parseAnalysis(raw: string): VoiceAnalysis | null {
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim()
    const s = cleaned.indexOf('{'), e = cleaned.lastIndexOf('}')
    if (s === -1) return null
    const p = JSON.parse(cleaned.slice(s, e + 1))

    const intents = ['note', 'question', 'reminder', 'mixed', 'unclear']
    return {
      intent: intents.includes(p.intent) ? p.intent : 'note',
      note: String(p.note ?? '').slice(0, 2000),
      question: String(p.question ?? '').slice(0, 500),
      reminders: (p.reminders ?? [])
        .map((r: any) => ({
          text: String(r.text ?? '').slice(0, 200),
          dueAt: String(r.dueAt ?? ''),
          priority: ['high', 'medium', 'low'].includes(r.priority) ? r.priority : 'medium',
          heardAs: String(r.heardAs ?? '').slice(0, 300)
        }))
        // Drop anything without usable text or a sane date rather than storing
        // a reminder that fires at the wrong time or never.
        .filter((r: ExtractedReminder) => r.text && plausibleDate(r.dueAt))
    }
  } catch {
    return null
  }
}
