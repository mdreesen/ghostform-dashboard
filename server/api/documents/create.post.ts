import { z } from 'zod'
import type { Model } from 'mongoose'
import DocumentModel from '../../../lib/database/models/Document'
import loggedInUser from '~/utils/loggedInUser'

const Doc = DocumentModel as Model<any>

const bodySchema = z.object({
  filename: z.string().min(1),
  storageKey: z.string().min(1),
  mime: z.string().default(''),
  bytes: z.number().default(0),
  homeId: z.string().nullish(),
  leadId: z.string().nullish()
})

/** POST /api/documents/create — record a file after it's uploaded to storage. */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const body = await readValidatedBody(event, bodySchema.parse)

  const doc = await Doc.create({
    userId: user._id,
    filename: body.filename,
    storageKey: body.storageKey,
    mime: body.mime,
    bytes: body.bytes,
    homeId: body.homeId || undefined,
    leadId: body.leadId || undefined,
    status: 'uploaded'
  })

  return { _id: String(doc._id) }
})
