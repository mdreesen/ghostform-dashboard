/**
 * GHOSTFORM AUTOMATED LEAD CHECK-IN ENGINE
 * NITRO SERVER TASK SPEC // RUNS VIA CRON QUEUE
 */
import { Resend } from 'resend'
import LeadModel from '~/server/database/models/Lead'

const resend = new Resend(process.env.RESEND_API_KEY)

export default defineTask({
  meta: {
    name: 'lead:reminders',
    description: 'Dispatches automated helpful check-in scripts to uncontacted leads'
  },
  async run() {
    console.log('Initializing GhostForm reminder engine pipeline...')
    
    // Define the time window (e.g., look for leads captured between 24 and 48 hours ago)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000)

    try {
      // Pull leads within the timeline window that are still marked 'new'
      const pendingLeads = await LeadModel.find({
        status: 'new',
        email: { $ne: '' }, // Ensure a valid routing address exists
        createdAt: { $gte: fortyEightHoursAgo, $lte: twentyFourHoursAgo },
        reminderSent: { $ne: true } // Avoid double-messaging candidates
      })

      if (pendingLeads.length === 0) {
        return { result: 'No pending reminder vectors discovered in this cycle.' }
      }

      // Loop through discovered nodes and dispatch personalized text
      for (const lead of pendingLeads) {
        // Simple fallback if the lead name was anonymous
        const greetingsName = lead.name && lead.name !== 'Anonymous Node' ? lead.name.split(' ')[0] : 'there'
        
        await resend.emails.send({
          from: 'GhostForm Assistant <assistant@yourdomain.com>',
          to: lead.email,
          subject: 'Quick question regarding your property search',
          // Keeping the copy highly personal, text-based, and completely free of spammy tracking graphics
          text: `Hi ${greetingsName},\n\nThanks for checking out the property info details through our digital flyer yesterday.\n\nI wanted to personally reach out and see if you had any quick questions about the home, the neighborhood, or local market trends that I can track down for you? \n\nI'm out reviewing inventory today but I'm completely here to help make things easier. Just reply straight to this text or email whenever you have a second.\n\nBest,\n\n[Realtor Name]\nGhostForm Connected Agent`,
        })

        // Flag the document in Mongo so they don't get double-emailed
        lead.reminderSent = true
        await lead.save()
      }

      return { result: `Successfully dispatched ${pendingLeads.length} reminder vectors.` }

    } catch (error) {
      console.error('Reminder engine execution fault:', error)
      return { result: 'Pipeline failure during email execution.' }
    }
  }
})