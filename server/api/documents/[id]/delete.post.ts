import type { Model } from 'mongoose'
import DocumentModel from '../../../../lib/database/models/Document'
import { deleteObject } from '~/utils/storage'
import loggedInUser from '~/utils/loggedInUser'
import { isObjectId } from '~/utils/objectId'

const Doc = DocumentModel as Model<any>

/**
 * POST /api/documents/:id/delete
 *
 * Removes the record AND the stored file. Deleting only the record leaves an
 * orphaned object nobody can reach and everybody keeps paying for — and with
 * contracts there's a second reason: a client's financials sitting in a bucket
 * with no record pointing at them is a liability, not just a cost.
 *
 * Scoped to the owner, so a user can only ever delete their own.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const routeId = event.context.params?.id
  if (!isObjectId(routeId)) {
    throw createError({ statusCode: 400, message: 'That link is missing an id.' })
  }

  const id = event.context.params?.id

  const doc = await Doc.findOne({ _id: id, userId: user._id }).lean() as any
  if (!doc) throw createError({ statusCode: 404, message: 'Document not found.' })

  // How many live deadlines disappear with it — the UI warns using this, and
  // it's returned so the response can confirm what actually happened.
  const liveDeadlines = (doc.deadlines ?? []).filter(
    (d: any) => d.confirmed && !d.dismissed && !d.completed
  ).length

  // Remove the file first. If it fails we log and still delete the record —
  // a stranded file is bad, but blocking someone from removing a client's
  // contract because of a storage hiccup is worse.
  let fileRemoved = true
  if (doc.storageKey) {
    try {
      await deleteObject(doc.storageKey)
    } catch (err) {
      fileRemoved = false
      console.error('[document] could not remove stored file for', id)
    }
  }

  await Doc.deleteOne({ _id: id, userId: user._id })

  if (!fileRemoved) {
    console.warn(`[document] record ${id} deleted but its file remains in storage.`)
  }

  return { success: true, liveDeadlines }
})
