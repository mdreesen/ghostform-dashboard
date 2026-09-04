import { createHmac } from 'node:crypto'

/**
 * Signed unsubscribe tokens.
 *
 * The link must work with no session — the recipient is not a GhostForm user
 * and will not log in to opt out. So the lead id travels in the URL, signed,
 * so nobody can unsubscribe someone else by guessing an id.
 *
 * Keyed on NUXT_SESSION_PASSWORD, which already exists and is already secret.
 */
function secret(): string {
  return process.env.NUXT_SESSION_PASSWORD || process.env.CRON_SECRET || 'ghostform-fallback'
}

export function signUnsubscribe(leadId: string): string {
  const sig = createHmac('sha256', secret()).update(leadId).digest('base64url').slice(0, 24)
  return `${leadId}.${sig}`
}

export function verifyUnsubscribe(token: string): string | null {
  const [id, sig] = String(token || '').split('.')
  if (!id || !sig) return null
  const expected = createHmac('sha256', secret()).update(id).digest('base64url').slice(0, 24)
  // Length-safe compare. Not timing-safe, and doesn't need to be — the worst
  // case is unsubscribing someone who wanted to stay subscribed.
  return sig === expected ? id : null
}

export function unsubscribeUrl(leadId: string, base?: string): string {
  const domain = base || process.env.PROJECT_DOMAIN || 'https://ghostform.app'
  return `${domain.replace(/\/$/, '')}/u/${signUnsubscribe(leadId)}`
}
