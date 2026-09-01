import type { Model } from 'mongoose'
import DocumentModel from '../../../lib/database/models/Document'
import loggedInUser from '~/utils/loggedInUser'

const Doc = DocumentModel as Model<any>

/** GET /api/documents?homeId=&leadId= */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const q = getQuery(event)
  const filter: Record<string, any> = { userId: user._id }
  if (q.homeId) filter.homeId = q.homeId
  if (q.leadId) filter.leadId = q.leadId

  return Doc.find(filter).sort({ createdAt: -1 }).limit(200).lean()
})
