import { z } from 'zod'
import { Resend } from 'resend'
import type { Model } from 'mongoose'
import LeadModelImport from '../../../../lib/database/models/Lead'
import loggedInUser from '~/utils/loggedInUser'
import { ghostFormUrl } from '~/utils/ghostFormUrl';

const LeadModel = LeadModelImport as Model<any>

const bodySchema = z.object({
  intent: z.enum(['buy', 'sell']).optional()
})

/**
 * POST /api/leads/:id/send-questionnaire
 * Emails the lead their questionnaire link and stamps qualification.sentAt.
 *
 * Branded as the REALTOR, not GhostForm — the lead has a relationship with
 * their agent, not with software they've never heard of.
 */
export default defineEventHandler(async (event) => {
  const leadId = event.context.params?.id
  const user = await loggedInUser(event);

  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { intent } = await readValidatedBody(event, bodySchema.parse)

  const lead = await LeadModel.findOne({ _id: leadId, userId: user._id }).lean() as any
  if (!lead) throw createError({ statusCode: 404, message: 'Lead not found.' })
  if (!lead.email) throw createError({ statusCode: 400, message: 'This lead has no email address.' })

  const resolvedIntent = intent || (String(lead.buy_sell_both || '').toLowerCase().includes('sell') ? 'sell' : 'buy')
  const token = createQualifyToken(String(lead._id))

  const useGhostFormUrl = ghostFormUrl(user.category, 'qualify', user?._id, user.company_hashed, user.email_hashed, user?.calendar_link)
  const link = `${useGhostFormUrl}/&t=${encodeURIComponent(token)}`

  const u = user as any
  const agentName = u.name || u.company || 'Your agent'
  const firstName = String(lead.name || '').split(' ')[0] || 'there'
  const accent = /^#[0-9A-Fa-f]{6}$/.test(u.brand_color || '') ? u.brand_color : '#B5563A'

  const subject = resolvedIntent === 'sell'
    ? 'A few questions before we talk about listing'
    : 'A few questions to narrow down your search'

  const body = resolvedIntent === 'sell'
    ? `Hi ${firstName},\n\nBefore we sit down, it would help to know a bit more about the property and what you're hoping for. It takes about five minutes, and it means our conversation starts somewhere useful instead of at the beginning.`
    : `Hi ${firstName},\n\nTo make sure I'm only sending you places worth your time, it would help to know a bit more about what you're after. It takes about five minutes and saves us both a lot of back and forth.`

  const html = `<!DOCTYPE html><html><body style="margin:0;background:#EFEAE0;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;"><tr><td align="center">
    <table role="presentation" width="100%" style="max-width:520px;background:#F7F4EF;border:1px solid #DDD6C9;">
      <tr><td style="height:4px;background:${accent};font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="padding:30px 34px 0;">
        <p style="margin:0;font-family:Georgia,serif;font-size:17px;font-weight:600;color:#1F1B16;">${u.company || agentName}</p>
      </td></tr>
      <tr><td style="padding:24px 34px 0;">
        ${body.split('\n\n').map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#1F1B16;">${p.replace(/\n/g, '<br>')}</p>`).join('')}
      </td></tr>
      <tr><td style="padding:10px 34px 34px;">
        <a href="${link}" style="display:inline-block;background:${accent};color:#F7F4EF;text-decoration:none;padding:14px 30px;font-size:12px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;">Answer the questions</a>
        <p style="margin:22px 0 0;font-size:13px;line-height:1.7;color:#8A847C;">— ${agentName}</p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`

  try {
    const resend = new Resend(process.env.RESEND_KEY)
    await resend.emails.send({
      from: `${String(agentName).replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'noreply'}@ascendpod.com`,
      to: [lead.email],
      replyTo: u.email,
      subject,
      html,
      text: `${body}\n\n${link}\n\n— ${agentName}`
    })
  } catch (error: any) {
    console.error('[qualify] send failed:', error?.message)
    throw createError({ statusCode: 502, message: 'Could not send the email. Please try again.' })
  }

  await LeadModel.updateOne({ _id: lead._id, userId: user._id }, {
    $set: { 'qualification.sentAt': new Date(), 'qualification.intent': resolvedIntent }
  })

  return { success: true, link }
})
