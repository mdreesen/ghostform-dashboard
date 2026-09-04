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
  intent: 'note' | 'question' | 'reminder' | 'sphere' | 'mixed' | 'unclear'
  /**
   * Something learned about a PERSON — the data that makes sphere nurture work
   * and that nobody ever types into a form.
   */
  sphere: { about: string; fact: string }[]
  /** Cleaned-up note text, when there's something worth keeping. */
  note: string
  /** The question asked, when there is one. */
  question: string
  /**
   * Names the model corrected against the known list.
   * Shown to the realtor, because a silent correction is a silent error when
   * it's wrong — and they're the only one who can tell.
   */
  corrected: { heard: string; used: string }[]
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
    `  sphere   — something about a PERSON you know, not a property or a task.`,
    `             "Ran into the Kellers, second kid on the way." "Tom's mother`,
    `             is moving to Whitefish." This is what makes a call later feel`,
    `             personal instead of generic, so capture it precisely.`,
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
    `FOR SPHERE, extract each fact:`,
    `  about — the person's name exactly as spoken. Do not guess a surname.`,
    `  fact  — what you learned, in ONE short clause, phrased so it still makes`,
    `          sense read aloud in six months: "second kid on the way" not "they`,
    `          said they might be having another one".`,
    ``,
    `Do NOT invent a sphere fact from a property observation. "The kitchen was`,
    `dated" is a note about a house, not a fact about a person.`,
    ``,
    `IF YOU CORRECT A NAME against the known list, record it:`,
    `  corrected: [{"heard":"white fish stage","used":"Whitefish Stage"}]`,
    `Leave the array empty when you changed nothing. Never list a correction`,
    `you did not actually make.`,
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

    const intents = ['note', 'question', 'reminder', 'sphere', 'mixed', 'unclear']
    return {
      intent: intents.includes(p.intent) ? p.intent : 'note',
      note: String(p.note ?? '').slice(0, 2000),
      question: String(p.question ?? '').slice(0, 500),
      corrected: (p.corrected ?? [])
        .map((c: any) => ({
          heard: String(c.heard ?? '').slice(0, 80),
          used: String(c.used ?? '').slice(0, 80)
        }))
        .filter((c: any) => c.heard && c.used && c.heard.toLowerCase() !== c.used.toLowerCase()),
      sphere: (p.sphere ?? [])
        .map((x: any) => ({
          about: String(x.about ?? '').slice(0, 80),
          fact: String(x.fact ?? '').slice(0, 200)
        }))
        .filter((x: any) => x.about && x.fact),
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
