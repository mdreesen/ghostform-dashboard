/**
 * ============================================================================
 * PUSH NOTIFICATIONS — CLIENT
 * ============================================================================
 * iOS is the constraint here. Web push works ONLY for a PWA added to the home
 * screen — an open Safari tab has no PushManager at all, and that's true in
 * every browser on iOS since they all use WebKit.
 *
 * So the UI has to tell an iPhone user to install first, rather than showing a
 * button that silently does nothing.
 * ============================================================================
 */
export function usePush() {
  const supported = ref(false)
  const permission = ref<NotificationPermission>('default')
  const subscribed = ref(false)
  const busy = ref(false)
  const error = ref('')

  /** iOS Safari, in any browser wrapper. */
  const isIOS = computed(() => {
    if (!import.meta.client) return false
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  })

  /** Running from the home screen rather than a browser tab. */
  const isStandalone = computed(() => {
    if (!import.meta.client) return false
    return window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any).standalone === true
  })

  /** iOS in a tab: push is impossible until they install. */
  const needsInstall = computed(() => isIOS.value && !isStandalone.value)

  onMounted(async () => {
    supported.value = 'serviceWorker' in navigator && 'PushManager' in window
    if (!supported.value) return
    permission.value = Notification.permission
    const reg = await navigator.serviceWorker.ready
    subscribed.value = Boolean(await reg.pushManager.getSubscription())
  })

  /** VAPID keys are base64url; PushManager wants a Uint8Array. */
  function urlBase64ToUint8Array(base64: string): Uint8Array {
    const padding = '='.repeat((4 - base64.length % 4) % 4)
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')
    const raw = atob(b64)
    return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)))
  }

  function deviceLabel(): string {
    const ua = navigator.userAgent
    if (/iPhone/.test(ua)) return 'iPhone'
    if (/iPad/.test(ua)) return 'iPad'
    if (/Android/.test(ua)) return 'Android phone'
    if (/Mac/.test(ua)) return 'Mac'
    if (/Windows/.test(ua)) return 'Windows PC'
    return 'This device'
  }

  async function subscribe(): Promise<boolean> {
    error.value = ''
    if (needsInstall.value) {
      error.value = 'On iPhone and iPad, add GhostForm to your home screen first — notifications only work from there.'
      return false
    }
    if (!supported.value) {
      error.value = 'This browser can\'t do notifications.'
      return false
    }

    busy.value = true
    try {
      const { publicKey, configured } = await $fetch<any>('/api/push/status')
      if (!configured || !publicKey) {
        error.value = 'Notifications aren\'t set up on the server yet.'
        return false
      }

      // Must be triggered by a user gesture, or the prompt is suppressed.
      const perm = await Notification.requestPermission()
      permission.value = perm
      if (perm !== 'granted') {
        error.value = perm === 'denied'
          ? 'Notifications are blocked. You can re-enable them in your browser settings.'
          : ''
        return false
      }

      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,     // required; silent push isn't allowed
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      })

      const json = sub.toJSON() as any
      await $fetch('/api/push/subscribe', {
        method: 'POST',
        body: { endpoint: json.endpoint, keys: json.keys, label: deviceLabel() }
      })

      subscribed.value = true
      return true
    } catch (err: any) {
      console.error('[push] subscribe failed', err)
      error.value = 'Could not turn on notifications. Please try again.'
      return false
    } finally {
      busy.value = false
    }
  }

  async function unsubscribe(): Promise<void> {
    busy.value = true
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      if (sub) {
        await $fetch('/api/push/unsubscribe', { method: 'POST', body: { endpoint: sub.endpoint } })
        await sub.unsubscribe()
      }
      subscribed.value = false
    } catch (err) {
      console.error('[push] unsubscribe failed', err)
    } finally {
      busy.value = false
    }
  }

  async function sendTest(): Promise<void> {
    await $fetch('/api/push/test', { method: 'POST' })
  }

  return {
    supported, permission, subscribed, busy, error,
    isIOS, isStandalone, needsInstall,
    subscribe, unsubscribe, sendTest
  }
}
