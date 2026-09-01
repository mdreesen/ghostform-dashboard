/**
 * ============================================================================
 * LEAD IMPORT
 * ============================================================================
 * Realtors arrive with leads already somewhere — a spreadsheet, a Zillow
 * export, Follow Up Boss, kvCORE, a CSV a previous brokerage handed them.
 * Asking them to retype 200 rows is how a trial ends on day one.
 *
 * The hard part isn't parsing CSV, it's that every source uses different
 * column names for the same thing. "Email", "Email Address", "E-mail",
 * "PrimaryEmail", "Contact Email" are all the same field. So this guesses the
 * mapping, shows it, and lets the realtor correct it before anything is saved.
 * ============================================================================
 */

export interface ColumnGuess {
  column: string
  field: string | null
  confidence: 'high' | 'low' | 'none'
  sample: string
}

/** Our fields, and the headers each is commonly called in the wild. */
const FIELD_ALIASES: Record<string, string[]> = {
  name: ['name', 'full name', 'fullname', 'contact', 'contact name', 'lead name', 'client'],
  first_name: ['first name', 'firstname', 'first', 'given name'],
  last_name: ['last name', 'lastname', 'last', 'surname', 'family name'],
  email: ['email', 'email address', 'e-mail', 'emailaddress', 'primary email', 'contact email'],
  phone: ['phone', 'phone number', 'mobile', 'cell', 'cell phone', 'telephone', 'primary phone', 'mobile phone'],
  buy_sell_both: ['type', 'lead type', 'buyer/seller', 'buyer or seller', 'intent', 'looking to', 'transaction type'],
  budget: ['budget', 'price', 'price range', 'max price', 'price point', 'target price'],
  address: ['address', 'street', 'property address', 'street address', 'location'],
  city: ['city', 'town'],
  notes: ['notes', 'note', 'comments', 'remarks', 'description', 'details'],
  source: ['source', 'lead source', 'origin', 'came from', 'referral source'],
  date: ['date', 'created', 'created at', 'date added', 'lead date', 'inquiry date']
}

const norm = (s: string) => String(s || '').trim().toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ')

/**
 * Guess which of our fields each column is.
 *
 * Exact alias match is 'high'; a containment match is 'low' and gets flagged
 * for the user to confirm. Guessing silently is how 200 phone numbers end up
 * in the notes field.
 */
export function guessColumns(headers: string[], firstRow: string[] = []): ColumnGuess[] {
  const used = new Set<string>()

  return headers.map((h, i) => {
    const n = norm(h)
    const sample = firstRow[i] ?? ''

    for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
      if (used.has(field)) continue
      if (aliases.includes(n)) { used.add(field); return { column: h, field, confidence: 'high' as const, sample } }
    }
    for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
      if (used.has(field)) continue
      if (aliases.some((a) => n.includes(a) || a.includes(n))) {
        used.add(field)
        return { column: h, field, confidence: 'low' as const, sample }
      }
    }
    return { column: h, field: null, confidence: 'none' as const, sample }
  })
}

/**
 * CSV parser that handles quoted fields containing commas and newlines.
 * A naive split(',') mangles any address, which is most of the file.
 */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let inQuotes = false

  const src = text.replace(/^\uFEFF/, '')   // strip BOM — Excel adds one

  for (let i = 0; i < src.length; i++) {
    const c = src[i]!
    const next = src[i + 1]

    if (inQuotes) {
      if (c === '"' && next === '"') { cell += '"'; i++ }
      else if (c === '"') inQuotes = false
      else cell += c
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(cell); cell = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && next === '\n') i++
      row.push(cell); cell = ''
      if (row.some((v) => v.trim())) rows.push(row)
      row = []
    } else {
      cell += c
    }
  }
  row.push(cell)
  if (row.some((v) => v.trim())) rows.push(row)

  return rows
}

const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

export interface MappedLead {
  name?: string
  email?: string
  phone?: string
  buy_sell_both?: string
  budget?: number
  address?: string
  notes?: string
  source?: string
}

export interface ImportResult {
  ready: MappedLead[]
  skipped: { row: number; reason: string }[]
  duplicatesInFile: number
}

/** Normalise whatever the source called it into what we store. */
function normaliseIntent(v: string): string {
  const s = norm(v)
  if (!s) return ''

  const buys = /buy|buyer|purchas/.test(s)
  const sells = /sell|seller|listing|list/.test(s)

  // Check BOTH before either — "buyer/seller" and "buy and sell" mean both,
  // and testing for 'sell' first silently mislabels every one of them.
  if (s.includes('both') || (buys && sells)) return 'both'
  if (sells) return 'sell'
  if (buys) return 'buy'
  return ''
}

function parseBudget(v: string): number | undefined {
  const digits = String(v || '').replace(/[^0-9.]/g, '')
  if (!digits) return undefined
  const n = Number(digits)
  if (!Number.isFinite(n) || n <= 0) return undefined
  // "425" almost certainly means 425k, not $425.
  return n < 10000 ? Math.round(n * 1000) : Math.round(n)
}

/**
 * Turn rows into leads, reporting exactly what was skipped and why.
 *
 * A silent import that drops 40 rows is worse than one that refuses — the
 * realtor believes they have their whole database and only finds out months
 * later when someone was never called.
 */
export function mapRows(
  rows: string[][],
  mapping: Record<number, string | null>
): ImportResult {
  const [, ...body] = rows
  const ready: MappedLead[] = []
  const skipped: { row: number; reason: string }[] = []
  const seenEmails = new Set<string>()
  let duplicatesInFile = 0

  body.forEach((cells, idx) => {
    const rowNo = idx + 2   // 1-indexed, plus the header
    const lead: MappedLead = {}
    let first = '', last = ''

    Object.entries(mapping).forEach(([colIdx, field]) => {
      if (!field) return
      const raw = (cells[Number(colIdx)] ?? '').trim()
      if (!raw) return

      switch (field) {
        case 'first_name': first = raw; break
        case 'last_name': last = raw; break
        case 'name': lead.name = raw; break
        case 'email': lead.email = raw.toLowerCase(); break
        case 'phone': lead.phone = raw; break
        case 'buy_sell_both': lead.buy_sell_both = normaliseIntent(raw); break
        case 'budget': lead.budget = parseBudget(raw); break
        case 'address': case 'city':
          lead.address = lead.address ? `${lead.address}, ${raw}` : raw; break
        case 'notes':
          lead.notes = lead.notes ? `${lead.notes}\n${raw}` : raw; break
        case 'source': lead.source = raw; break
      }
    })

    if (!lead.name && (first || last)) lead.name = [first, last].filter(Boolean).join(' ')

    // An email is what makes a lead contactable, and the server requires it.
    if (!lead.email) { skipped.push({ row: rowNo, reason: 'no email address' }); return }
    if (!EMAIL_RE.test(lead.email)) { skipped.push({ row: rowNo, reason: `email doesn't look valid (${lead.email})` }); return }

    if (seenEmails.has(lead.email)) { duplicatesInFile++; return }
    seenEmails.add(lead.email)

    if (!lead.name) lead.name = lead.email.split('@')[0]
    ready.push(lead)
  })

  return { ready, skipped, duplicatesInFile }
}
