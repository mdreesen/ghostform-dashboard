import { z } from 'zod'
import { renderEmail } from '~/utils/emailTemplate'
import loggedInUser from '~/utils/loggedInUser'

const blockSchema = z.object({
  type: z.enum(['text', 'image', 'button', 'property', 'divider']),
  text: z.string().optional(),
  src: z.string().optional(),
  alt: z.string().optional(),
  href: z.string().optional(),
  label: z.string().optional(),
  address: z.string().optional(),
  price: z.string().optional(),
  beds: z.string().optional(),
  baths: z.string().optional()
})

const bodySchema = z.object({
  blocks: z.array(blockSchema).max(30),
  heading: z.string().max(120).optional(),
  preheader: z.string().max(160).optional()
})

/**
 * POST /api/campaigns/preview
 *
 * Renders exactly what will be sent, with the caller's own branding and
 * {{name}} filled in with a sample. Nobody should send a campaign to their
 * database without seeing it first.
 */
export default defineEventHandler(async (event) => {
  const user = await loggedInUser(event)
  if (!user?._id) throw createError({ statusCode: 401, message: 'Session expired.' })

  const { blocks, heading, preheader } = await readValidatedBody(event, bodySchema.parse)

  const filled = blocks.map((b) => ({
    ...b,
    text: b.text
      ?.replace(/\{\{name\}\}/g, 'Sarah')
      ?.replace(/\{\{agent\}\}/g, (user as any).name || 'you')
  }))

  return {
    html: renderEmail({
      brand: {
        name: (user as any).name || '',
        email: (user as any).email || '',
        photo: (user as any).photo || undefined,
        phone: (user as any).phone || undefined,
        accent: (user as any).accent_color || undefined
      },
      heading,
      preheader,
      blocks: filled as any,
      unsubscribeUrl: 'https://example.com/unsubscribe'
    })
  }
})
