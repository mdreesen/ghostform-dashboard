import type { Model } from 'mongoose'
import UserModel from '../../lib/database/models/User'
import { buildDeadlineBriefing } from './deadlineBriefing'
import { buildDailyBriefing } from './dailyBriefing'
import { sendToUser } from './push'

const User = UserModel as Model<any>

/**
 * The morning push. Called from the daily cron.
 *
 * ONE notification per realtor, not one per item. The fastest way to get
 * notifications disabled is to send several — so this is a single line that
 * earns the tap, or nothing at all.
 */
export async function sendMorningPushes(): Promise<{ users: number; sent: number }> {
  // Only users with at least one device registered.
  const { default: PushSubscriptionModel } = await import('../../lib/database/models/PushSubscription')
  const Sub = PushSubscriptionModel as Model<any>

  const userIds = await Sub.distinct('userId')
  if (!userIds.length) return { users: 0, sent: 0 }

  let sent = 0

  for (const userId of userIds) {
    try {
      const [briefing, deadlines] = await Promise.all([
        buildDailyBriefing(String(userId), {}),
        buildDeadlineBriefing(userId)
      ])

      const overdue = deadlines.filter((d) => d.daysUntil < 0).length
      const today = deadlines.filter((d) => d.daysUntil === 0).length
      const people = briefing?.totals?.total ?? 0

      // Nothing to say? Say nothing. A daily "you have 0 things" is how an app
      // trains someone to swipe it away without reading.
      if (!overdue && !today && !people) continue

      const parts: string[] = []
      if (overdue) parts.push(`${overdue} deadline${overdue === 1 ? '' : 's'} overdue`)
      if (today) parts.push(`${today} due today`)
      if (people) parts.push(`${people} ${people === 1 ? 'person' : 'people'} to reach`)

      const res = await sendToUser(userId, {
        title: overdue ? 'Something is overdue' : 'Today at a glance',
        body: parts.join(' · '),
        url: '/dashboard',
        tag: 'gf-briefing'    // replaces yesterday's rather than stacking
      }, 'briefing')

      sent += res.sent
    } catch (err: any) {
      // One user's failure must not stop the rest of the run.
      console.error('[push] briefing failed for', String(userId), err?.message)
    }
  }

  return { users: userIds.length, sent }
}
