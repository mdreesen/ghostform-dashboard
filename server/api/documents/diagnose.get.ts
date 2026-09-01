import loggedInUser from '~/utils/loggedInUser'
import { hasR2 } from '~/utils/storage'

/**
 * GET /api/documents/diagnose  — DEV AID
 *
 * Answers "why did reading fail?" directly, instead of inferring it from a
 * failed upload. Makes one tiny real API call, because a key being *present*
 * and a key *working* are different things.
 *
 * Never returns the key itself.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const cfg = useRuntimeConfig()
  const key = cfg.anthropicKey as string

  const out: Record<string, any> = {
    storageDriver: hasR2() ? 'r2' : 'local (.data/uploads)',
    anthropicKeyPresent: Boolean(key),
    anthropicKeyLooksValid: Boolean(key && key.startsWith('sk-ant-')),
    model: cfg.anthropicModel
  }

  if (!key) {
    out.verdict = 'ANTHROPIC_API_KEY is missing from .env — reading cannot work.'
    return out
  }

  try {
    await $fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: { model: cfg.anthropicModel, max_tokens: 4, messages: [{ role: 'user', content: 'hi' }] }
    })
    out.apiReachable = true
    out.verdict = 'Key and model both work. If reading still fails, the issue is the PDF itself — check the server log for [document] read failed.'
  } catch (err: any) {
    const detail = err?.data?.error?.message || err?.message
    out.apiReachable = false
    out.status = err?.status || err?.statusCode
    out.detail = detail
    out.verdict = out.status === 401
      ? 'The API key was rejected. Check ANTHROPIC_API_KEY.'
      : out.status === 404
      ? `The model "${cfg.anthropicModel}" was not found. Set ANTHROPIC_MODEL to one your key can use.`
      : 'The API call failed — see detail.'
  }

  return out
})
