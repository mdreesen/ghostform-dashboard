import type { Model } from 'mongoose'
import CampaignModel from '../../../lib/database/models/Campaign';
import loggedInUser from '~/utils/loggedInUser'

const Campaign = CampaignModel as Model<any>

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await loggedInUser(event)

  // 1. Session tracing validation
  if (!user?._id) {
    throw createError({ 
      statusCode: 401, 
      message: 'Session trace missing or expired.' 
    })
  }

  const { title, targetStatus, subject, messageBody, dayOfWeek, timesPerMonth, varyWording, blocks, preheader } = body

  // 2. Comprehensive input parameter presence checks
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0

  // messageBody OR blocks — a campaign built entirely from blocks has no
  // messageBody, and requiring it would make the builder unusable.
  if (!targetStatus || !subject || (!messageBody && !hasBlocks) || dayOfWeek === undefined || !timesPerMonth) {
    throw createError({ 
      statusCode: 400, 
      message: 'Missing required automated workflow properties.' 
    })
  }

  try {
    // 3. Write structural parameters directly to the Campaign collection document row
    const campaign = await Campaign.create({
      userId: user._id,
      title: title || `${targetStatus.toUpperCase()} Automated Loop`,
      targetStatus,
      subject,
      messageBody: messageBody || '',
      // Only the block types the renderer knows — anything else is dropped
      // rather than stored and silently ignored at send time.
      blocks: hasBlocks
        ? blocks.filter((b: any) =>
            ['text', 'image', 'button', 'property', 'divider'].includes(b?.type))
        : [],
      preheader: typeof preheader === 'string' ? preheader.slice(0, 160) : '',
      dayOfWeek: Number(dayOfWeek),
      timesPerMonth: Number(timesPerMonth),
      // Default ON: repeated identical copy reads as a robot and hurts
      // deliverability. Realtors can opt out per campaign.
      varyWording: varyWording !== false,
      lastFiredAt: null // Explicitly initialize as empty queue window ready to fire
    })

    return { 
      success: true, 
      campaignId: campaign._id,
      message: 'Dynamic workflow successfully written to tracking database.'
    }

  } catch (error: any) {
    console.error('Campaign creation failed:', error)
    throw createError({ 
      statusCode: 500, 
      message: error.message || 'Failed to instantiate database configuration profile.' 
    })
  }
})