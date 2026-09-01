/**
 * ============================================================================
 * DOCUMENT READING
 * ============================================================================
 * Identifies what a document is, then extracts the dates that matter for that
 * kind of document. No fixed schema — the realtor uploads whatever they need,
 * so the model has to work out the type before it knows which dates count.
 *
 * EVERY DATE IS A PROPOSAL. Nothing becomes a reminder until a human confirms
 * it, and each one carries the sentence it came from. A misread contingency
 * date is a missed deadline with real money attached, and the liability sits
 * with the agent, not with us.
 * ============================================================================
 */

export interface ExtractedDeadline {
  label: string
  date: string          // ISO
  sourceText: string
  priority: 'high' | 'medium' | 'low'
  reason: string        // why this priority
}

export interface DocumentReading {
  docType: string
  summary: string
  deadlines: ExtractedDeadline[]
}

function buildPrompt(filename: string, today: string): string {
  return [
    `Read this real estate document and pull out the dates that matter.`,
    `Filename: ${filename}`,
    `Today's date: ${today}`,
    ``,
    `FIRST decide what kind of document it is — purchase agreement, listing`,
    `agreement, inspection report, disclosure, addendum, repair estimate,`,
    `something else. Which dates matter depends entirely on that.`,
    ``,
    `THEN extract every date that creates an obligation or a deadline for the`,
    `agent. Examples of what counts:`,
    `  · inspection or due-diligence period ending`,
    `  · financing or appraisal contingency expiring`,
    `  · earnest money due`,
    `  · closing / settlement date`,
    `  · listing agreement expiry`,
    `  · offer or counter-offer expiry`,
    `  · repair completion or re-inspection`,
    `  · possession or key handover`,
    ``,
    `For EACH date give:`,
    `  label      — what has to happen, in the agent's words ("Inspection`,
    `               contingency expires"). Not a quote from the contract.`,
    `  date       — ISO YYYY-MM-DD. If the document says "10 days from`,
    `               acceptance", calculate it and say so in sourceText.`,
    `  sourceText — the sentence you took it from, VERBATIM. This is how the`,
    `               agent checks your work. Never paraphrase it.`,
    `  priority   — high | medium | low`,
    `  reason     — one short line on why that priority`,
    ``,
    `PRIORITY MEANS:`,
    `  high   — missing it loses the deal or costs money. Contingency`,
    `           deadlines, earnest money, financing dates, closing.`,
    `  medium — needs doing but has slack. Scheduling, document returns.`,
    `  low    — informational or far off. Expiry dates months away.`,
    ``,
    `Also write a 2-3 line summary of what this document is and what it commits`,
    `the parties to.`,
    ``,
    `HARD RULES`,
    `- If a date is ambiguous or you had to infer it, say so plainly in`,
    `  sourceText. An honest "unclear" is far better than a confident guess —`,
    `  the agent will act on this.`,
    `- Do NOT include dates that create no obligation (the date it was printed,`,
    `  someone's birthday, a past date that has already passed).`,
    `- Do NOT give legal advice or interpret what a clause means. Report what`,
    `  it says.`,
    `- Do NOT repeat any Social Security number, bank account, or full card`,
    `  number in the summary or sourceText, even if the document contains one.`,
    ``,
    `Return ONLY JSON, no fence:`,
    `{"docType":"...","summary":"...","deadlines":[{"label":"...","date":"YYYY-MM-DD",`,
    `"sourceText":"...","priority":"high","reason":"..."}]}`
  ].join('\n')
}

/** Redaction backstop — the prompt forbids these, this catches a slip. */
const SENSITIVE = [
  /\b\d{3}-\d{2}-\d{4}\b/g,                 // SSN
  /\b\d{13,19}\b/g,                          // card / account numbers
  /\b\d{9,12}\b(?=\s*(routing|account))/gi
]

function redact(text: string): string {
  let out = String(text || '')
  for (const re of SENSITIVE) out = out.replace(re, '[removed]')
  return out
}

export async function readDocument(
  base64: string,
  mime: string,
  filename: string
): Promise<DocumentReading | null> {
  const cfg = useRuntimeConfig()
  const key = cfg.anthropicKey as string
  if (!key) throw new Error('CONFIG: ANTHROPIC_API_KEY is not set.')

  const today = new Date().toISOString().slice(0, 10)

  // PDFs go as a document block; images as an image block.
  const isPdf = mime === 'application/pdf'
  const content: any[] = [{
    type: isPdf ? 'document' : 'image',
    source: { type: 'base64', media_type: mime, data: base64 }
  }, {
    type: 'text',
    text: buildPrompt(filename, today)
  }]

  try {
    const res = await $fetch<any>('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        // PDF document blocks require this beta header. Without it the API
        // rejects the request, which surfaced as "we could not find dates" —
        // blaming the document for a header problem.
        ...(isPdf ? { 'anthropic-beta': 'pdfs-2024-09-25' } : {}),
        'content-type': 'application/json'
      },
      body: {
        model: cfg.anthropicModel,
        max_tokens: 2000,
        messages: [{ role: 'user', content }]
      }
    })

    const raw = res?.content?.find((b: any) => b.type === 'text')?.text
    if (!raw) throw new Error('MODEL: the API returned no text.')

    const cleaned = raw.replace(/```json|```/g, '').trim()
    const s = cleaned.indexOf('{'), e = cleaned.lastIndexOf('}')
    if (s === -1) throw new Error('MODEL: response was not JSON.')

    const parsed = JSON.parse(cleaned.slice(s, e + 1))

    const deadlines: ExtractedDeadline[] = (parsed.deadlines ?? [])
      .map((d: any) => ({
        label: redact(String(d.label ?? '')).slice(0, 120),
        date: String(d.date ?? ''),
        sourceText: redact(String(d.sourceText ?? '')).slice(0, 400),
        priority: ['high','medium','low'].includes(d.priority) ? d.priority : 'medium',
        reason: redact(String(d.reason ?? '')).slice(0, 160)
      }))
      // Drop anything without a parseable date rather than storing garbage.
      .filter((d: ExtractedDeadline) => d.label && !Number.isNaN(Date.parse(d.date)))

    return {
      docType: redact(String(parsed.docType ?? '')).slice(0, 60),
      summary: redact(String(parsed.summary ?? '')).slice(0, 600),
      deadlines
    }
  } catch (err: any) {
    // Log the FULL error. Swallowing it is why this looked like a document
    // problem when it was a missing header.
    const detail = err?.data?.error?.message || err?.response?._data?.error?.message || err?.message
    console.error('[document] read failed:', {
      status: err?.status || err?.statusCode,
      detail,
      model: cfg.anthropicModel,
      isPdf
    })
    // Re-throw with a tagged message so the endpoint can tell the user
    // something specific instead of a generic fallback.
    if (String(detail).match(/beta|pdf/i)) throw new Error(`PDF: ${detail}`)
    if (err?.status === 401 || err?.statusCode === 401) throw new Error('CONFIG: the API key was rejected.')
    if (err?.status === 429 || err?.statusCode === 429) throw new Error('RATE: too many requests.')
    throw new Error(`MODEL: ${detail || 'unknown error'}`)
  }
}
