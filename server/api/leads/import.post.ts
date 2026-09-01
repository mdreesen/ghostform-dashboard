import { z } from 'zod'
import type { Model } from 'mongoose'
import LeadModelImport from '../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'

const Lead = LeadModelImport as Model<any>

const bodySchema = z.object({
  leads: z.array(z.object({
    name: z.string().optional(),
    email: z.string(),
    phone: z.string().optional(),
    buy_sell_both: z.string().optional(),
    budget: z.number().optional(),
    address: z.string().optional(),
    notes: z.string().optional(),
    source: z.string().optional()
  })).min(1).max(2000),
  /** What to do when an email already exists in their database. */
  onDuplicate: z.enum(['skip', 'update']).default('skip')
})

/**
 * POST /api/leads/import
 *
 * Duplicates are checked against EXISTING leads, not just within the file. A
 * realtor importing a second export from the same source would otherwise end
 * up with two of every contact and two follow-up threads — worse than not
 * importing at all.
 *
 * Capped at 2000 rows per request so one enormous file can't time out the
 * function mid-write and leave a half-imported database.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { leads, onDuplicate } = await readValidatedBody(event, bodySchema.parse)

  const emails = leads.map((l) => l.email.toLowerCase())
  const existing = await Lead.find(
    { userId: user._id, email: { $in: emails } },
    { email: 1 }
  ).lean() as any[]
  const existingSet = new Set(existing.map((e) => String(e.email).toLowerCase()))

  const toInsert: any[] = []
  const toUpdate: any[] = []

  for (const l of leads) {
    const email = l.email.toLowerCase()
    const doc = {
      userId: user._id,
      name: l.name || email.split('@')[0],
      email,
      phone: l.phone || '',
      buy_sell_both: l.buy_sell_both || '',
      budget: l.budget,
      address: l.address || '',
      notes: l.notes || '',
      // Marked so the realtor can tell imported leads from captured ones —
      // they behave differently and deserve different follow-up.
      source: l.source || 'import',
      status: 'new'
    }

    if (existingSet.has(email)) {
      if (onDuplicate === 'update') toUpdate.push(doc)
    } else {
      toInsert.push(doc)
    }
  }

  let inserted = 0
  if (toInsert.length) {
    // ordered:false so one bad row doesn't abort the rest of the batch.
    const res = await Lead.insertMany(toInsert, { ordered: false }).catch((err: any) => {
      console.error('[import] partial insert:', err?.message)
      return err?.insertedDocs ?? []
    })
    inserted = Array.isArray(res) ? res.length : toInsert.length
  }

  let updated = 0
  for (const doc of toUpdate) {
    const { userId, email, ...fields } = doc
    // Never blank an existing value with an empty import cell.
    const set = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== '' && v !== undefined))
    const r = await Lead.updateOne({ userId: user._id, email }, { $set: set })
    updated += r.modifiedCount
  }

  return {
    success: true,
    inserted,
    updated,
    skippedExisting: onDuplicate === 'skip' ? existingSet.size : 0,
    total: leads.length
  }
})
