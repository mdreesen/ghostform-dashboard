<script setup lang="ts">
/**
 * "Did this close?"
 *
 * Appears when a contract's closing date has passed and the lead isn't marked
 * closed yet. One question, two taps — the point is that marking a deal closed
 * never depends on remembering to.
 *
 * Sits ABOVE the sphere list, because this is what fills it.
 */
import { toDateInput, localDate } from '~/utils/priority'

const toast = useToast()
const busy = ref<string | null>(null)
const dismissed = ref<string[]>([])

const { data, refresh } = useFetch<any[]>('/api/closings', {
  key: 'closings', server: false, lazy: true
})
const prompts = computed(() =>
  (data.value ?? []).filter((p: any) => !dismissed.value.includes(p.leadId))
)

async function confirm(p: any) {
  busy.value = p.leadId
  try {
    await $fetch(`/api/leads/${p.leadId}/close`, {
      method: 'POST',
      body: {
        closedAt: toDateInput(p.closedOn),   // the date from the contract
        closedAddress: p.address
      }
    })
    await Promise.all([refresh(), refreshNuxtData('sphere')])
    toast.add({ title: `${p.leadName} moved to past clients.` })
  } catch (err: any) {
    toast.add({ title: err?.data?.message || 'Could not save that.', color: 'error', duration: 8000 })
  } finally {
    busy.value = null
  }
}

// Not persisted — a deal that fell through will be asked about again next
// week, which is better than losing it silently if they mis-tap.
function notYet(p: any) { dismissed.value.push(p.leadId) }
</script>

<template>
  <section v-if="prompts.length" class="gf-section">
    <p class="h-label" style="margin-bottom:6px">Did this close?</p>

    <div
      v-for="p in prompts" :key="p.leadId"
      class="gf-row"
      style="display:block"
    >
      <p class="gf-body">
        <strong>{{ p.leadName }}</strong>
        <template v-if="p.address"> · {{ p.address }}</template>
      </p>
      <p class="gf-meta">
        The contract had closing on
        {{ localDate(p.closedOn).toLocaleDateString(undefined, { month: 'long', day: 'numeric' }) }}.
      </p>

      <div class="gf-row-actions" style="margin-top:10px">
        <button
          class="h-btn h-btn-go gf-tap"
          :disabled="busy === p.leadId"
          @click="confirm(p)"
        >
          {{ busy === p.leadId ? 'Saving…' : 'Yes, it closed' }}
        </button>
        <button class="h-btn h-btn-quiet gf-tap" @click="notYet(p)">Not yet</button>
      </div>
    </div>
  </section>
</template>
