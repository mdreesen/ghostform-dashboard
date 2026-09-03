/**
 * ============================================================================
 * PUSH HANDLER
 * ============================================================================
 * Imported into the generated service worker via workbox `importScripts`.
 *
 * DELIBERATELY SEPARATE from the generated worker: this file is hand-written
 * and can be reviewed on its own, and it does NOT touch navigation or caching.
 * The outage this morning came from a worker intercepting page loads — nothing
 * here does that, so a bug in this file can break notifications but cannot
 * take the site down.
 * ============================================================================
 */

self.addEventListener('push', (event) => {
  if (!event.data) return

  let payload
  try {
    payload = event.data.json()
  } catch {
    payload = { title: 'GhostForm', body: event.data.text() }
  }

  const title = payload.title || 'GhostForm'
  const options = {
    body: payload.body || '',
    icon: '/images/maskable-icon.png',
    badge: '/images/maskable-icon.png',
    // tag collapses repeats — a second deadline push replaces the first
    // rather than stacking, which is what you want at 7am.
    tag: payload.tag || 'ghostform',
    renotify: Boolean(payload.tag),
    data: { url: payload.url || '/dashboard' }
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = (event.notification.data && event.notification.data.url) || '/dashboard'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // Focus an existing tab rather than opening a duplicate — a realtor
      // tapping a notification wants the app they already have open.
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(target)
          return client.focus()
        }
      }
      return self.clients.openWindow(target)
    })
  )
})
