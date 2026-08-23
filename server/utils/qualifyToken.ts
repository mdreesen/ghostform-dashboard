import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Signed tokens for questionnaire links.
 *
 * The link goes to a lead by email, so it must be usable without a login —
 * but a raw Mongo _id in the URL would let anyone edit a character and answer
 * on behalf of a different lead. An HMAC signature makes the token
 * unforgeable without the server secret.
 *
 * Format: <leadId>.<expiryMs>.<signature>
 */

function secret(): string {
  const s = process.env.QUALIFY_SECRET || process.env.NUXT_SESSION_PASSWORD
  if (!s) throw new Error('QUALIFY_SECRET (or NUXT_SESSION_PASSWORD) must be set to sign questionnaire links.')
  return s
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

/** Create a token. Default validity 30 days — long enough for a slow lead. */
export function createQualifyToken(leadId: string, days = 30): string {
  const expiry = Date.now() + days * 86400_000
  const payload = `${leadId}.${expiry}`
  return `${payload}.${sign(payload)}`
}

/** Verify and unpack. Returns null for tampered, malformed or expired tokens. */
export function readQualifyToken(token: string): { leadId: string } | null {
  if (!token || typeof token !== 'string') return null

  const parts = token.split('.')
  if (parts.length !== 3) return null

  const [leadId, expiryRaw, providedSig] = parts as [string, string, string]
  const payload = `${leadId}.${expiryRaw}`
  const expectedSig = sign(payload)

  // Constant-time compare so the signature can't be guessed byte by byte.
  const a = Buffer.from(providedSig)
  const b = Buffer.from(expectedSig)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  const expiry = Number(expiryRaw)
  if (!Number.isFinite(expiry) || Date.now() > expiry) return null

  return { leadId }
}
