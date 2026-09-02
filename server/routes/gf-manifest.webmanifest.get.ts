/**
 * ============================================================================
 * DYNAMIC WEB APP MANIFEST
 * ============================================================================
 * `app/layouts/default.vue` links to /gf-manifest.webmanifest with the page's
 * query params attached. This route serves a manifest whose `start_url` carries
 * those params through.
 *
 * WHY IT EXISTS:
 * iOS uses the manifest's start_url when a page is added to the home screen.
 * With a static "/" the realtor's configuration — which form, which company,
 * which address — is dropped at install time, and the icon opens a blank form.
 *
 * A missing route here is worse than it looks: the browser 404s on every page
 * load of the capture form, which is the one screen that has to work in front
 * of a stranger at an open house.
 * ============================================================================
 */
export default defineEventHandler((event) => {
  const q = getQuery(event)

  // Only carry through params the form actually reads. Reflecting arbitrary
  // input into a served file is how you end up with an injection surface.
  const ALLOWED = [
    'category', 'source', 'id',
    'company_name', 'company_email',
    'calendar', 'address',
    'background_color', 'font_color', 'accent_color'
  ]

  const params = new URLSearchParams()
  for (const key of ALLOWED) {
    const v = q[key]
    if (v === undefined) continue
    const s = String(v)
    // Length-capped and control characters stripped
    if (s.length && s.length < 200) params.set(key, s.replace(/[\u0000-\u001F\u007F]/g, ''))
  }

  const qs = params.toString()
  const startUrl = qs ? `/?${qs}` : '/'

  // Theme colours can be overridden per realtor, same as the form itself.
  const hex = (v: unknown, fallback: string) => {
    const raw = String(v ?? '').replace(/^#/, '')
    return /^[0-9A-Fa-f]{6}$/.test(raw) ? `#${raw}` : fallback
  }

  const name = String(q.company_name || 'GhostForm').slice(0, 45)

  setHeader(event, 'Content-Type', 'application/manifest+json')
  // Short cache: a realtor changing branding shouldn't wait an hour to see it,
  // but every page load re-fetching this is wasteful.
  setHeader(event, 'Cache-Control', 'public, max-age=300')

  return {
    name,
    short_name: name.slice(0, 12),
    description: 'Capture leads anywhere — even without signal.',
    start_url: startUrl,
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: hex(q.background_color, '#F7F4EF'),
    theme_color: hex(q.background_color, '#F7F4EF'),
    icons: [
      { src: '/images/maskable-icon.png', sizes: '445x445', type: 'image/png', purpose: 'any' },
      { src: '/images/maskable-icon.png', sizes: '445x445', type: 'image/png', purpose: 'maskable' }
    ]
  }
})
