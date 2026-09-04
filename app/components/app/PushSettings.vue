<script setup lang="ts">
/**
 * Notification settings. Drop on the profile page.
 *
 * The iOS case gets its own state — telling someone to install first is more
 * useful than a button that can't work.
 */
const { supported, subscribed, busy, error, needsInstall, isIOS, subscribe, unsubscribe, sendTest } = usePush()
const toast = useToast()
const testing = ref(false)

const { data: status, refresh } = useFetch<any>('/api/push/status', {
  key: 'push-status', server: false, lazy: true
})

async function turnOn() {
  if (await subscribe()) { await refresh(); toast.add({ title: 'Notifications on.' }) }
}
async function turnOff() {
  await unsubscribe(); await refresh(); toast.add({ title: 'Notifications off.' })
}
async function test() {
  testing.value = true
  try { await sendTest(); toast.add({ title: 'Sent — check your device.' }) }
  catch { toast.add({ title: 'Could not send.', color: 'error', duration: 8000 }) }
  finally { testing.value = false }
}
</script>

<template>
  <section>
    <p class="h-label" style="margin-bottom:6px">Notifications</p>
    <p class="gf-meta gf-measure-tight" style="margin-bottom:var(--s3)">
      A single push each morning with what needs doing, and an alert when a
      deadline is overdue. Nothing else.
    </p>

    <!-- iOS in a browser tab: push genuinely cannot work here -->
    <div v-if="needsInstall" class="h-inset" style="padding:var(--s2)">
      <p class="gf-body" style="font-weight:600;margin-bottom:6px">Add GhostForm to your home screen first</p>
      <p class="gf-meta">
        On {{ isIOS ? 'iPhone and iPad' : 'this device' }}, notifications only work
        from an installed app. Tap Share, then <strong>Add to Home Screen</strong>,
        and open GhostForm from the icon.
      </p>
    </div>

    <div v-else-if="!supported" class="h-inset" style="padding:var(--s2)">
      <p class="gf-meta">This browser can't do notifications. Chrome, Edge or Safari will work.</p>
    </div>

    <div v-else-if="!status?.configured" class="h-inset" style="padding:var(--s2)">
      <p class="gf-meta">Notifications aren't set up on the server yet.</p>
    </div>

    <template v-else>
      <div class="gf-row-actions" style="margin-bottom:var(--s2)">
        <button
          v-if="!subscribed"
          class="h-btn gf-tap"
          :disabled="busy"
          @click="turnOn"
        >
          {{ busy ? 'Turning on…' : 'Turn on notifications' }}
        </button>
        <template v-else>
          <button class="h-btn h-btn-quiet gf-tap" :disabled="testing" @click="test">
            {{ testing ? 'Sending…' : 'Send a test' }}
          </button>
          <button class="h-btn h-btn-quiet gf-tap" :disabled="busy" @click="turnOff">
            Turn off
          </button>
        </template>
      </div>

      <p v-if="error" class="gf-meta" style="color:#B5563A">{{ error }}</p>

      <!-- Devices, so a realtor can see what's registered -->
      <div v-if="status?.devices?.length" style="margin-top:var(--s2)">
        <p class="gf-label gf-muted" style="margin-bottom:8px">Receiving on</p>
        <div v-for="d in status.devices" :key="d.endpoint" class="gf-field-row">
          <p class="gf-meta">{{ d.label || 'Unknown device' }}</p>
          <p class="gf-meta gf-muted">
            Added {{ new Date(d.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) }}
          </p>
        </div>
      </div>
    </template>
  </section>
</template>
