/**
 * Scroll-driven reveal system.
 *
 * Any element with `.gf-depth` rotates up out of depth into place when it
 * enters the viewport (CSS handles the transition; this just adds `.in`).
 * Any descendant with `data-count` counts up to its target at the same time.
 *
 * Re-runs on every route change so newly mounted pages animate too.
 * Respects prefers-reduced-motion by revealing everything immediately.
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  function runCount(el: HTMLElement) {
    if (el.dataset.done) return
    el.dataset.done = '1'

    const target = parseFloat(el.dataset.count || '0')
    const decimals = parseInt(el.dataset.dec || '0', 10)
    const suffix = el.dataset.suffix || ''

    if (reduced) {
      el.textContent = target.toFixed(decimals) + suffix
      return
    }

    const start = performance.now() + 150
    const duration = 1100

    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration))
      const eased = 1 - Math.pow(1 - t, 3)
      el.textContent = (target * eased).toFixed(decimals) + suffix
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  let observer: IntersectionObserver | null = null

  function scan() {
    const targets = document.querySelectorAll<HTMLElement>('.gf-depth:not(.in)')

    if (reduced) {
      targets.forEach((el) => {
        el.classList.add('in')
        el.querySelectorAll<HTMLElement>('[data-count]').forEach(runCount)
      })
      return
    }

    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const el = entry.target as HTMLElement
            el.classList.add('in')
            el.querySelectorAll<HTMLElement>('[data-count]').forEach(runCount)
            observer?.unobserve(el)
          })
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      )
    }

    targets.forEach((el) => observer!.observe(el))
  }

  // Initial pass + after every page transition.
  nuxtApp.hook('page:finish', () => nextTick(scan))
  nuxtApp.hook('app:mounted', () => nextTick(scan))
})
