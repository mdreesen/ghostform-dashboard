import { z } from 'zod'
import { Resend } from 'resend'
import { renderEmail, renderEmailText } from '~~/server/utils/emailTemplate'
import loggedInUser from '~/utils/loggedInUser'

const resend = new Resend(process.env.RESEND_KEY)

const bodySchema = z.object({
  subject: z.string().min(1).max(200),
  preheader: z.string().max(160).optional(),
  blocks: z.array(z.object({
    type: z.enum(['text', 'image', 'button', 'property', 'divider']),
    text: z.string().optional(), src: z.string().optional(), alt: z.string().optional(),
    href: z.string().optional(), label: z.string().optional(), address: z.string().optional(),
    price: z.string().optional(), beds: z.string().optional(), baths: z.string().optional()
  })).max(30)
})

/**
 * POST /api/campaigns/send-test
 *
 * Sends the campaign to the realtor's own inbox.
 *
 * The browser preview is not a mail client. Gmail strips things, Outlook
 * renders with Word, images get blocked, and dark mode inverts colours. None
 * of that shows in an iframe — and nobody should find out after emailing two
 * hundred past clients.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event) as any
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })
  if (!user.email) throw createError({ statusCode: 400, message: 'Your account has no email address.' })
  if (!process.env.RESEND_KEY) throw createError({ statusCode: 500, message: 'Email is not configured on the server.' })

  const { subject, preheader, blocks } = await readValidatedBody(event, bodySchema.parse)

  const filled = blocks.map((b) => ({
    ...b,
    text: b.text?.replace(/\{\{name\}\}/g, 'Sarah').replace(/\{\{agent\}\}/g, user.name || 'you')
  }))

  const brand = {
    name: user.name || '',
    email: user.email,
    photo: user.photo || undefined,
    phone: user.phone || undefined,
    accent: user.accent_color || undefined,
    mailingAddress: user.mailingAddress || undefined
  }

  try {
    await resend.emails.send({
      from: `GhostForm <noreply@ascendpod.com>`,
      to: user.email,
      replyTo: user.email,
      // Marked, so a test can never be mistaken for a real send in their inbox.
      subject: `[Test] ${subject}`,
      html: renderEmail({
        brand,
        preheader,
        blocks: filled as any,
        // A real, working link — testing the email without testing the
        // unsubscribe would miss the thing most likely to be broken.
        unsubscribeUrl: `${process.env.PROJECT_DOMAIN || 'https://ghostform.app'}/u/test`
      }),
      text: renderEmailText({ brand, blocks: filled as any })
    })
    return { success: true, sentTo: user.email }
  } catch (err: any) {
    console.error('[campaign] test send failed:', err?.message)
    throw createError({ statusCode: 502, message: 'Could not send the test. Check the server email settings.' })
  }
})
