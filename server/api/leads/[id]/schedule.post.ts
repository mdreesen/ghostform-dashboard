import type { Model } from 'mongoose'
import schemaImport from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'
import { isObjectId } from '~/utils/objectId'

const LeadModel = schemaImport as Model<any>

export default defineEventHandler(async (event) => {
  const leadId = event.context.params?.id
  const body = await readBody(event)
  const user = await loggedInUser(event)

  if (!user?._id) {
    throw createError({ statusCode: 401, message: 'Session trace expired.' })
  }

  // The realtor will send an ISO date string, or null/falsy to turn off reminders
  const { scheduledTime } = body 

  try {
    const queryFilter = { _id: leadId, userId: user._id }
    
    // If no target date parameter is present, disable the automation queue for this client
    if (!scheduledTime) {
      await LeadModel.updateOne(queryFilter, {
        $set: { reminderStatus: 'none' },
        $unset: { reminderScheduledAt: '' }
      })
      return { success: true, message: 'Automation sequence disabled for this client.' }
    }

    // Otherwise, load it cleanly straight into the active queue
    await LeadModel.updateOne(queryFilter, {
      $set: {
        reminderStatus: 'scheduled',
        reminderScheduledAt: new Date(scheduledTime)
      }
    })

    return { success: true, message: 'Custom reminder window logged to pipeline queue.' }

  } catch (error) {
    throw createError({ statusCode: 500, message: 'Queue allocation transaction aborted.' })
  }
})