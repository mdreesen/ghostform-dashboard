import type { Model } from 'mongoose'
import LeadModel from '../../../lib/database/models/Lead'
import { verifyUnsubscribe } from '~~/server/utils/unsubscribe'

const Lead = LeadModel as Model<any>

/**
 * GET /u/:token — public, no session.
 *
 * ONE CLICK, no confirmation step. CAN-SPAM requires opt-out to be simple,
 * and an "are you sure?" page is a dark pattern that generates spam
 * complaints instead of unsubscribes — which is far worse for the sending
 * domain than losing a contact.
 */
export default defineEventHandler(async (event) => {
  const token = event.context.params?.token
  const leadId = verifyUnsubscribe(String(token || ''))

  const page = (title: string, body: string) => {
    setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
    return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Inter:wght@400&display=swap" rel="stylesheet">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F7F4EF;color:#1F1B16;
font-family:Inter,-apple-system,sans-serif;padding:24px}
.c{max-width:32rem;text-align:center}
h1{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:28px;margin:0 0 12px;letter-spacing:-.02em}
p{margin:0;color:#6B655C;line-height:1.6}</style></head>
<body><div class="c"><h1>${title}</h1><p>${body}</p></div></body></html>`
  }

  if (!leadId) {
    setResponseStatus(event, 400)
    return page('That link isn\'t valid', 'It may have been altered. Reply to any email and we\'ll take you off the list.')
  }

  const lead = await Lead.findOneAndUpdate(
    { _id: leadId },
    { $set: { unsubscribedAt: new Date() } },
    { new: true }
  ).lean() as any

  if (!lead) {
    // Say "done" anyway — confirming which ids exist leaks information, and
    // the person's intent is satisfied either way.
    return page('You\'re unsubscribed', 'You won\'t receive any more emails.')
  }

  return page(
    'You\'re unsubscribed',
    'You won\'t receive any more marketing emails. If you\'re working with an agent, they can still reply to you directly.'
  )
})
