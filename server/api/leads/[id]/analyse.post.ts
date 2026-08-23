import type { Model } from 'mongoose'
import LeadModelImport from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'
import { analyseLead } from '~~/server/utils/leadAnalysis'

const LeadModel = LeadModelImport as Model<any>

/**
 * POST /api/leads/:id/analyse
 * Runs (or re-runs) the analysis for a lead who has completed the
 * qualification questionnaire, and caches the result on the lead.
 *
 * Refuses to run on an unqualified lead — analysing a name and a price range
 * produces confident-sounding filler, which is worse than no analysis because
 * a realtor might act on it.
 */
export default defineEventHandler(async (event) => {
  const leadId = event.context.params?.id
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const lead = await LeadModel.findOne({ _id: leadId, userId: user._id }).lean() as any
  if (!lead) throw createError({ statusCode: 404, message: 'Lead not found.' })

  const answers = lead?.qualification?.answers ?? {}
  const answered = Object.values(answers).filter((v) => String(v ?? '').trim()).length

  if (answered < 4) {
    throw createError({
      statusCode: 400,
      message: 'Not enough information yet. Send the questionnaire first — analysis needs real answers to be worth anything.'
    })
  }

  const intent = lead?.qualification?.intent || lead?.buy_sell_both || 'buy'
  const result = await analyseLead(answers, intent, lead?.name || '')

  await LeadModel.updateOne({ _id: leadId, userId: user._id }, {
    $set: {
      analysis: {
        readiness: result.scorecard.readiness,
        readinessLabel: result.scorecard.readinessLabel,
        financingRisk: result.scorecard.financingRisk,
        signals: result.scorecard.signals,
        gaps: result.scorecard.gaps,
        read: result.read,
        nextSteps: result.nextSteps,
        source: result.source,
        generatedAt: new Date(result.generatedAt)
      }
    }
  })

  return result
})
