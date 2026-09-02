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
  /**
   * OPENAI DOESN'T ACCEPT PDFs THE WAY ANTHROPIC DOES.
   *
   * Anthropic takes a PDF as a `document` block and reads it natively.
   * OpenAI's chat API has no equivalent — it takes text or images. So:
   *
   *   PDF   -> extract the text, send the text
   *   Image -> send as a vision input (gpt-4o-mini handles this)
   *
   * Text extraction is actually the better path for contracts: it's faster
   * and cheaper than vision, and title companies produce text PDFs. The gap
   * is SCANNED contracts, which have no text layer — those are detected and
   * the realtor is told to photograph the pages instead, which routes through
   * the vision path and works.
   */
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('CONFIG: OPENAI_API_KEY is not set in .env.')

  const today = new Date().toISOString().slice(0, 10)
  const isPdf = mime === 'application/pdf'

  let messages: any[]

  if (isPdf) {
    let text = ''
    try {
      const { extractText, getDocumentProxy } = await import('unpdf')
      const bytes = Uint8Array.from(Buffer.from(base64, 'base64'))
      const pdf = await getDocumentProxy(bytes)
      const res = await extractText(pdf, { mergePages: true })
      text = String(res.text || '').trim()
    } catch (err: any) {
      console.error('[document] pdf text extraction failed:', err?.message)
      throw new Error('PDF: could not read that PDF.')
    }

    // A scanned page yields almost nothing. Say so plainly rather than
    // sending an empty prompt and returning "no dates found", which would
    // look like the document had none.
    if (text.length < 120) {
      throw new Error(
        'SCANNED: that PDF has no readable text — it looks like a scan. ' +
        'Take a photo of the pages instead and upload that.'
      )
    }

    messages = [{
      role: 'user',
      content: `${buildPrompt(filename, today)}

DOCUMENT TEXT:
"""
${text.slice(0, 60000)}
"""`
    }]
  } else {
    // Images go straight to vision
    messages = [{
      role: 'user',
      content: [
        { type: 'text', text: buildPrompt(filename, today) },
        { type: 'image_url', image_url: { url: `data:${mime};base64,${base64}` } }
      ]
    }]
  }

  try {
    const { openai } = await import('~/utils/ai/openAi/useOpenAi')
    const res = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      max_tokens: 2000,
      temperature: 0.1,          // extraction, not writing
      messages
    })

    const raw = res?.choices?.[0]?.message?.content
    if (!raw) throw new Error('MODEL: the API returned no text.')

    const cleaned = raw.replace(/```json|```/g, '').trim()
    const a = cleaned.indexOf('{'), b = cleaned.lastIndexOf('}')
    if (a === -1) throw new Error('MODEL: response was not JSON.')

    const parsed = JSON.parse(cleaned.slice(a, b + 1))

    const deadlines: ExtractedDeadline[] = (parsed.deadlines ?? [])
      .map((d: any) => ({
        label: redact(String(d.label ?? '')).slice(0, 120),
        date: String(d.date ?? ''),
        sourceText: redact(String(d.sourceText ?? '')).slice(0, 400),
        priority: ['high', 'medium', 'low'].includes(d.priority) ? d.priority : 'medium',
        reason: redact(String(d.reason ?? '')).slice(0, 160)
      }))
      .filter((d: ExtractedDeadline) => d.label && !Number.isNaN(Date.parse(d.date)))

    return {
      docType: redact(String(parsed.docType ?? '')).slice(0, 60),
      summary: redact(String(parsed.summary ?? '')).slice(0, 600),
      deadlines
    }
  } catch (err: any) {
    const detail = err?.error?.message || err?.message
    console.error('[document] read failed:', { status: err?.status, detail, isPdf })
    if (String(detail).startsWith('SCANNED:') || String(detail).startsWith('PDF:')) throw err
    if (err?.status === 401) throw new Error('CONFIG: the OpenAI key was rejected.')
    if (err?.status === 429) throw new Error('RATE: too many requests.')
    throw new Error(`MODEL: ${detail || 'unknown error'}`)
  }
}
