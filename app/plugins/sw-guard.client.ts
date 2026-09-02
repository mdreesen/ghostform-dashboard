/**
 * ============================================================================
 * SERVICE WORKER GUARD
 * ============================================================================
 * A service worker that intercepts navigation is a single point of failure for
 * the whole site. If it throws, pages render blank with NO console error, and a
 * corrected deploy can't take over because the broken worker is still in
 * control. That's what took ghostform.app down.
 *
 * Two protections:
 *
 * 1. ?sw=off  — unregisters everything and clears caches. A way back in that
 *    doesn't require talking someone through DevTools.
 *
 * 2. Auto-recovery — if a controlled page fails to render, unregister and
 *    reload once. A stale worker should never be able to trap a user.
 * ============================================================================
 */
export default defineNuxtPlugin(() => {
  if (!import.meta.client || !('serviceWorker' in navigator)) return

  const nuke = async (reason: string) => {
    try {
      const regs = await navigator.serviceWorker.getRegistrations()
      await Promise.all(regs.map((r) => r.unregister()))
      if (window.caches) {
        const keys = await caches.keys()
        await Promise.all(keys.map((k) => caches.delete(k)))
      }
      console.warn(`[sw-guard] unregistered service workers: ${reason}`)
    } catch (err) {
      console.error('[sw-guard] cleanup failed', err)
    }
  }

  // 1 · Manual escape hatch: ghostform.app/login?sw=off
  if (new URLSearchParams(location.search).has('sw')) {
    nuke('requested via ?sw').then(() => {
      const u = new URL(location.href)
      u.searchParams.delete('sw')
      location.replace(u.toString())
    })
    return
  }

  // 2 · Auto-recovery. If a worker controls this page and the app hasn't
  //     mounted shortly after load, assume the worker is the problem.
  if (!navigator.serviceWorker.controller) return

  const KEY = 'gf-sw-recovered'
  window.addEventListener('load', () => {
    setTimeout(() => {
      const mounted = document.querySelector('#__nuxt')?.children.length
      if (mounted) return
      // Only ever recover once, or a genuinely broken app would reload forever.
      if (sessionStorage.getItem(KEY)) return
      sessionStorage.setItem(KEY, '1')
      nuke('page did not render').then(() => location.reload())
    }, 4000)
  })
})
