/**
 * ============================================================================
 * EMAIL TEMPLATE
 * ============================================================================
 * Campaign emails were plain text joined with \n\n. That reaches the inbox
 * looking like a system notification, which is the opposite of what a realtor
 * wants — every email goes out as THEM, not as software.
 *
 * EMAIL HTML IS NOT WEB HTML. The constraints below are not preferences:
 *
 *   · TABLES, not flex or grid. Outlook uses Word's rendering engine and
 *     ignores both entirely.
 *   · INLINE STYLES. Gmail strips <style> blocks in some contexts, and most
 *     clients ignore external stylesheets.
 *   · NO WEB FONTS in Outlook. Fraunces is requested and falls back to Georgia,
 *     which is on every Windows and Mac machine — so the email still reads as
 *     a serif rather than collapsing to Times.
 *   · 600px MAX. Wider is cut off in the Outlook reading pane.
 *   · IMAGES NEED width, height AND alt. Many clients block images by default,
 *     so the layout must hold with none of them loaded and the alt text must
 *     say something useful.
 * ============================================================================
 */

export interface EmailBrand {
  name: string
  email: string
  photo?: string
  accent?: string
  phone?: string
  /**
   * CAN-SPAM requires a valid physical postal address in every commercial
   * email. Not optional, and not something to leave to the realtor to
   * remember — so it renders in the footer whenever it's set.
   */
  mailingAddress?: string
}

export interface EmailBlock {
  type: 'text' | 'image' | 'button' | 'property' | 'divider'
  text?: string
  src?: string
  alt?: string
  href?: string
  label?: string
  /** property block */
  address?: string
  price?: string
  beds?: string
  baths?: string
}

const INK = '#1F1B16'
const MUTED = '#6B655C'
const HAIR = '#DDD6C9'
const PAPER = '#F7F4EF'

const esc = (s: unknown) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Serif stack with real fallbacks — Georgia ships on Windows and Mac. */
const SERIF = "Fraunces, Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"

function block(b: EmailBlock, accent: string): string {
  switch (b.type) {
    case 'text':
      // Paragraphs, not <br>. Line breaks collapse differently per client.
      return String(b.text ?? '')
        .split(/\n{2,}/)
        .filter(Boolean)
        .map((p) => `<p style="margin:0 0 18px;font-family:${SANS};font-size:16px;line-height:1.6;color:${INK};">${esc(p).replace(/\n/g, '<br>')}</p>`)
        .join('')

    case 'image':
      if (!b.src) return ''
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;">
        <tr><td>
          <img src="${esc(b.src)}" alt="${esc(b.alt || '')}" width="600"
               style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;" />
        </td></tr></table>`

    case 'property':
      // Reads as a listing even with images off.
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
              style="margin:0 0 22px;border:1px solid ${HAIR};background:${PAPER};">
        ${b.src ? `<tr><td><img src="${esc(b.src)}" alt="${esc(b.alt || b.address || 'Property')}" width="600"
             style="display:block;width:100%;max-width:600px;height:auto;border:0;" /></td></tr>` : ''}
        <tr><td style="padding:20px 24px;">
          <p style="margin:0 0 6px;font-family:${SERIF};font-size:21px;line-height:1.25;color:${INK};font-weight:600;">${esc(b.address ?? '')}</p>
          ${b.price ? `<p style="margin:0 0 4px;font-family:${SANS};font-size:17px;color:${accent};font-weight:600;">${esc(b.price)}</p>` : ''}
          ${(b.beds || b.baths) ? `<p style="margin:0;font-family:${SANS};font-size:14px;color:${MUTED};">${esc([b.beds && `${b.beds} bed`, b.baths && `${b.baths} bath`].filter(Boolean).join(' · '))}</p>` : ''}
        </td></tr>
      </table>`

    case 'button':
      if (!b.href) return ''
      // Table-wrapped, because a styled <a> alone doesn't render as a button
      // in Outlook.
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
        <tr><td style="background:${INK};">
          <a href="${esc(b.href)}"
             style="display:inline-block;padding:14px 28px;font-family:${SANS};font-size:15px;font-weight:600;color:${PAPER};text-decoration:none;">
            ${esc(b.label || 'View')}
          </a>
        </td></tr></table>`

    case 'divider':
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
        <tr><td style="border-top:1px solid ${HAIR};font-size:0;line-height:0;">&nbsp;</td></tr></table>`

    default:
      return ''
  }
}

export function renderEmail(opts: {
  brand: EmailBrand
  heading?: string
  blocks: EmailBlock[]
  /** Shown in the inbox list under the subject — worth writing deliberately. */
  preheader?: string
  unsubscribeUrl?: string
}): string {
  const accent = opts.brand.accent || '#B5563A'
  const body = opts.blocks.map((b) => block(b, accent)).join('')

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>${esc(opts.heading || opts.brand.name)}</title>
<!--[if mso]><style>body,table,td{font-family:Georgia,serif !important;}</style><![endif]-->
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background:#EFEAE0;-webkit-font-smoothing:antialiased;">

<!-- Preheader: the grey text beside the subject in an inbox list. Hidden in
     the body itself. Writing it deliberately is one of the cheapest wins
     available in email. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.preheader || '')}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EFEAE0;">
  <tr><td align="center" style="padding:32px 16px;">

    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
           style="width:600px;max-width:600px;background:${PAPER};border:1px solid ${HAIR};">

      ${opts.heading ? `<tr><td style="padding:36px 32px 8px;">
        <h1 style="margin:0;font-family:${SERIF};font-size:29px;line-height:1.15;color:${INK};font-weight:600;">${esc(opts.heading)}</h1>
      </td></tr>` : ''}

      <tr><td style="padding:${opts.heading ? '20px' : '36px'} 32px 8px;">
        ${body}
      </td></tr>

      <!-- Signature. This is why the email looks like it came from a person. -->
      <tr><td style="padding:8px 32px 34px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${HAIR};width:100%;">
          <tr><td style="padding-top:22px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                ${opts.brand.photo ? `<td style="padding-right:14px;" valign="top">
                  <img src="${esc(opts.brand.photo)}" alt="${esc(opts.brand.name)}" width="48" height="48"
                       style="display:block;width:48px;height:48px;border-radius:50%;border:0;" />
                </td>` : ''}
                <td valign="middle">
                  <p style="margin:0;font-family:${SERIF};font-size:17px;color:${INK};font-weight:600;">${esc(opts.brand.name)}</p>
                  <p style="margin:2px 0 0;font-family:${SANS};font-size:13px;color:${MUTED};">
                    ${esc(opts.brand.email)}${opts.brand.phone ? ` &middot; ${esc(opts.brand.phone)}` : ''}
                  </p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </td></tr>
    </table>

    <!-- CAN-SPAM footer. The address and the opt-out are legal requirements,
         not design choices. -->
    ${(opts.unsubscribeUrl || opts.brand.mailingAddress) ? `<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">
      <tr><td align="center" style="padding:18px 16px;">
        ${opts.brand.mailingAddress ? `<p style="margin:0 0 6px;font-family:${SANS};font-size:12px;line-height:1.5;color:#A9A39A;">${esc(opts.brand.mailingAddress)}</p>` : ''}
        ${opts.unsubscribeUrl ? `<p style="margin:0;font-family:${SANS};font-size:12px;color:#A9A39A;">
          <a href="${esc(opts.unsubscribeUrl)}" style="color:#A9A39A;text-decoration:underline;">Unsubscribe from these emails</a>
        </p>` : ''}
      </td></tr></table>` : ''}

  </td></tr>
</table>
</body></html>`
}

/** Plain-text alternative. Required — a HTML-only email scores worse in spam
 *  filters, and some clients still render text by preference. */
export function renderEmailText(opts: { brand: EmailBrand; heading?: string; blocks: EmailBlock[] }): string {
  const parts: string[] = []
  if (opts.heading) parts.push(opts.heading, '')
  for (const b of opts.blocks) {
    if (b.type === 'text' && b.text) parts.push(b.text, '')
    if (b.type === 'property') parts.push([b.address, b.price, [b.beds && `${b.beds} bed`, b.baths && `${b.baths} bath`].filter(Boolean).join(' · ')].filter(Boolean).join('\n'), '')
    if (b.type === 'button' && b.href) parts.push(`${b.label || 'View'}: ${b.href}`, '')
  }
  parts.push('—', opts.brand.name, opts.brand.email)
  return parts.join('\n')
}
