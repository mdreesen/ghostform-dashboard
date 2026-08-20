import { Resend } from 'resend';

const PALETTE = {
  paper: '#F7F4EF',
  paperWarm: '#EFEAE0',
  ink: '#1F1B16',
  gray: '#8A847C',
  graySoft: '#A9A39A',
  rust: '#B5563A',
  hair: '#DDD6C9'
}

function welcomeHtml(firstName: string, domain: string) {
  const p = PALETTE
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${p.paper};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${p.ink};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${p.paper};padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${p.paper};">

        <!-- Wordmark -->
        <tr><td style="padding-bottom:36px;">
          <span style="font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:700;letter-spacing:-0.3px;color:${p.ink};">GhostForm</span>
        </td></tr>

        <!-- Headline -->
        <tr><td style="padding-bottom:18px;">
          <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.15;font-weight:600;letter-spacing:-0.5px;color:${p.ink};">
            Welcome, ${firstName}.
          </h1>
        </td></tr>

        <tr><td style="padding-bottom:30px;">
          <p style="margin:0;font-size:16px;line-height:1.65;color:${p.gray};">
            You just did the thing most agents put off: you set up a system so the
            follow-up happens whether or not you remember it.
          </p>
        </td></tr>

        <!-- Why this was a good call -->
        <tr><td style="padding-bottom:12px;">
          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5A6349;font-weight:600;">
            Why this matters
          </p>
        </td></tr>

        <tr><td style="padding-bottom:30px;">
          <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:${p.ink};">
            Most leads aren't lost to competition. They're lost to silence — the
            buyer you meant to call back on Tuesday who signed with someone else
            by Friday.
          </p>
          <p style="margin:0;font-size:15px;line-height:1.7;color:${p.gray};">
            GhostForm exists to close that gap. Every morning it hands you a short
            list: who's new, who's gone quiet, and who you promised to follow up
            with. No spreadsheet to maintain, no CRM to babysit.
          </p>
        </td></tr>

        <!-- What you now have -->
        <tr><td style="padding-bottom:14px;border-top:1px solid ${p.hair};padding-top:30px;">
          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5A6349;font-weight:600;">
            What you now have
          </p>
        </td></tr>

        <tr><td style="padding-bottom:32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${[
              ['A QR code for your open houses', 'Guests sign in on their own phone. It works even with no cell signal — the leads sync once you’re back in range.'],
              ['Your morning call list', 'New leads, cold leads, and overdue follow-ups, ranked so you start at the top.'],
              ['Follow-ups that send themselves', 'Set an email once and it goes out weekly, biweekly, or monthly to everyone at that stage.'],
              ['Messages written for you', 'One tap drafts a text or email using what that lead actually told you.']
            ].map(([title, body]) => `
            <tr><td style="padding-bottom:18px;">
              <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:16px;font-weight:600;color:${p.ink};">${title}</p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:${p.gray};">${body}</p>
            </td></tr>`).join('')}
          </table>
        </td></tr>

        <!-- The one action that matters -->
        <tr><td style="background:${p.paperWarm};border:1px solid ${p.hair};padding:28px;">
          <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:18px;font-weight:600;color:${p.ink};">
            Start here: print one QR code
          </p>
          <p style="margin:0 0 20px;font-size:14px;line-height:1.65;color:${p.gray};">
            It takes about two minutes. Put it on the table at your next showing and
            let it collect a lead — that's the moment this stops being another tool
            you signed up for.
          </p>
          <a href="${domain}/dashboard/forms"
             style="display:inline-block;background:${p.rust};color:${p.paper};text-decoration:none;padding:14px 28px;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">
            Get my QR code
          </a>
        </td></tr>

        <!-- Trial terms, stated plainly -->
        <tr><td style="padding-top:30px;">
          <p style="margin:0;font-size:13px;line-height:1.65;color:${p.graySoft};">
            You're on a 30-day free trial. Your card isn't charged until day 31, and
            you can cancel any time before then from your profile.
          </p>
        </td></tr>

        <!-- Personal sign-off -->
        <tr><td style="padding-top:30px;border-top:1px solid ${p.hair};margin-top:30px;">
          <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:${p.gray};">
            I built GhostForm myself in Kalispell Montana, and I read every reply to this
            address. If something's confusing or missing, tell me — I'd rather hear it
            than have you quietly stop using it.
          </p>
          <p style="margin:16px 0 0;font-size:14px;color:${p.ink};font-weight:500;">
            — White Raven Development
          </p>
        </td></tr>

        <tr><td style="padding-top:34px;">
          <p style="margin:0;font-size:11px;color:${p.graySoft};letter-spacing:0.3px;">
            GhostForm · Built in the Flathead Valley, Montana
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

/** Plain-text fallback — some clients block HTML, and it helps deliverability. */
function welcomeText(firstName: string, domain: string) {
  return `Welcome, ${firstName}.

You just did the thing most agents put off: you set up a system so the follow-up
happens whether or not you remember it.

WHY THIS MATTERS
Most leads aren't lost to competition. They're lost to silence — the buyer you
meant to call back on Tuesday who signed with someone else by Friday. GhostForm
exists to close that gap. Every morning it hands you a short list: who's new,
who's gone quiet, and who you promised to follow up with.

WHAT YOU NOW HAVE
- A QR code for your open houses. Guests sign in on their own phone. Works with
  no cell signal; leads sync when you're back in range.
- Your morning call list. New, cold, and overdue follow-ups, ranked.
- Follow-ups that send themselves. Weekly, biweekly, or monthly.
- Messages written for you, using what that lead actually told you.

START HERE: PRINT ONE QR CODE
Two minutes. Put it on the table at your next showing and let it collect a lead.
${domain}/dashboard/forms

You're on a 30-day free trial. Your card isn't charged until day 31, and you can
cancel any time before then from your profile.

I built GhostForm myself in Kalispell, and I read every reply to this
address. If something's confusing or missing, tell me.

— White Raven Development Team

GhostForm · Built in the Flathead Valley, Montana`
}

/**
 * Send the welcome email. Never throws — a failed welcome must not fail signup.
 * Returns true when Resend accepted it.
 */
export async function sendWelcomeEmail(email: string, company?: string): Promise<boolean> {
  if (!email) return false

  const key = process.env.RESEND_KEY
  if (!key) {
    console.error('[welcome] RESEND_KEY not set — skipping welcome email.')
    return false
  }

  // We only collect company at signup, so greet with that; fall back to
  // something warm rather than an empty space.
  const raw = (company || '').trim()
  const firstName = raw
    ? raw.charAt(0).toUpperCase() + raw.slice(1)
    : 'there'

  const domain = (process.env.PROJECT_DOMAIN || '').replace(/\/$/, '')

  try {
    const resend = new Resend(key)
    await resend.emails.send({
      from: 'Michael at GhostForm <hello@ascendpod.com>',
      to: [email],
      replyTo: 'whiteravendev90@gmail.com',
      subject: 'Welcome to GhostForm — start here',
      html: welcomeHtml(firstName, domain),
      text: welcomeText(firstName, domain)
    })
    return true
  } catch (error: any) {
    console.error('[welcome] Send failed:', error?.message || error)
    return false
  }
}
