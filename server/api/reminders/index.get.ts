import type { Model } from 'mongoose'
import ReminderModel from '../../../lib/database/models/Reminder'
import HomeModel from '../../../lib/database/models/Home'
import loggedInUser from '~/utils/loggedInUser'

const Reminder = ReminderModel as Model<any>
const Home = HomeModel as Model<any>

/**
 * GET /api/reminders?horizon=14
 *
 * Returns BOTH confirmed and unconfirmed, flagged — unlike document deadlines,
 * which stay hidden until confirmed.
 *
 * The difference: a contract deadline the AI guessed wrong is a legal date the
 * realtor might act on. A reminder they spoke thirty seconds ago is something
 * they already know about — hiding it until confirmed would just look like the
 * app ignored them.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const horizon = Number(getQuery(event).horizon ?? 14)
  const start = new Date(); start.setHours(0, 0, 0, 0)
  const until = new Date(start); until.setDate(until.getDate() + horizon)

  const items = await Reminder.find({
    userId: user._id,
    completed: false,
    dismissed: false,
    dueAt: { $lte: until }     // overdue included — no lower bound
  }).sort({ dueAt: 1 }).limit(100).lean() as any[]

  const homeIds = [...new Set(items.map((r) => r.homeId).filter(Boolean).map(String))]
  const homes = homeIds.length
    ? await Home.find({ _id: { $in: homeIds }, userId: user._id }, { name: 1, address: 1 }).lean() as any[]
    : []
  const homeById = new Map(homes.map((h) => [String(h._id), h]))

  return items.map((r) => {
    const home = r.homeId ? homeById.get(String(r.homeId)) : null
    return {
      _id: String(r._id),
      text: r.text,
      dueAt: r.dueAt,
      priority: r.priority,
      confirmed: r.confirmed,
      source: r.source,
      heardAs: r.heardAs,
      propertyAddress: home?.address ?? '',
      propertyName: home?.name ?? '',
      homeId: r.homeId ? String(r.homeId) : undefined,
      daysUntil: Math.round((new Date(r.dueAt).setHours(0, 0, 0, 0) - start.getTime()) / 86400000)
    }
  })
})
