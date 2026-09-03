import webpush from 'web-push'
import type { Model } from 'mongoose'
import PushSubscriptionModel from '../../lib/database/models/PushSubscription'

const Sub = PushSubscriptionModel as Model<any>

let configured = false

function configure(): boolean {
  if (configured) return true
  const pub = process.env.VAPID_PUBLIC_KEY
  const priv = process.env.VAPID_PRIVATE_KEY
  if (!pub || !priv) return false

  webpush.setVapidDetails(
    // Must be a mailto: or https: URL — the push service uses it to contact
    // you if your pushes start misbehaving.
    process.env.VAPID_SUBJECT || 'mailto:support@ghostform.app',
    pub,
    priv
  )
  configured = true
  return true
}

export interface PushPayload {
  title: string
  body: string
  /** Where clicking it should land. */
  url?: string
  tag?: string
}

/**
 * Send to every device a user has registered.
 *
 * Returns how many landed. Dead subscriptions are DELETED rather than retried:
 * a 404 or 410 means the browser revoked it, and that's permanent.
 */
export async function sendToUser(
  userId: any,
  payload: PushPayload,
  kind: 'deadlines' | 'briefing' | 'newLeads' = 'briefing'
): Promise<{ sent: number; removed: number }> {
  if (!configure()) {
    console.warn('[push] VAPID keys not set — skipping')
    return { sent: 0, removed: 0 }
  }

  const subs = await Sub.find({ userId, [`prefs.${kind}`]: true }).lean() as any[]
  if (!subs.length) return { sent: 0, removed: 0 }

  let sent = 0
  let removed = 0

  await Promise.all(subs.map(async (s) => {
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: s.keys },
        JSON.stringify(payload),
        { TTL: 60 * 60 * 12 }   // a briefing is worthless tomorrow
      )
      sent++
      await Sub.updateOne({ _id: s._id }, { $set: { lastSentAt: new Date(), failureCount: 0 } })
    } catch (err: any) {
      const code = err?.statusCode
      if (code === 404 || code === 410) {
        // Revoked. Not an error — clean it up.
        await Sub.deleteOne({ _id: s._id })
        removed++
        return
      }
      console.error('[push] send failed', code, err?.body || err?.message)
      await Sub.updateOne({ _id: s._id }, { $inc: { failureCount: 1 } })
      // Give up on a device that keeps failing rather than retrying forever.
      await Sub.deleteOne({ _id: s._id, failureCount: { $gte: 10 } })
    }
  }))

  return { sent, removed }
}

export function pushConfigured(): boolean {
  return Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY)
}
