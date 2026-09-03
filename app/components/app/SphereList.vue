<script setup lang="ts">
/**
 * WHO'S GONE QUIET
 *
 * Every CRM sells sphere nurture, and every one hands you a reminder to call.
 * A reminder isn't the hard part — picking up the phone with nothing to say is.
 * "Touch base" calls don't get made, so the reminder gets snoozed and the
 * database goes cold anyway.
 *
 * So the OPENER is the headline here, not the name. The name is who; the
 * opener is why you'd enjoy the call.
 */
const toast = useToast()
const busy = ref<string | null>(null)

const { data, refresh } = useFetch<any[]>('/api/sphere', {
  key: 'sphere', server: false, lazy: true
})
const people = computed(() => data.value ?? [])

async function touched(p: any) {
  busy.value = p._id
  try {
    await $fetch(`/api/sphere/${p._id}/touched`, { method: 'POST' })
    await refresh()
  } catch {
    toast.error('Could not update that.')
  } finally {
    busy.value = null
  }
}
</script>

<template>
  <section v-if="people.length" class="gf-section">
    <p class="h-label" style="margin-bottom:6px">Worth a call</p>
    <p class="gf-meta gf-measure-tight" style="margin-bottom:var(--s3)">
      Past clients you haven't spoken to in a while. Around three quarters of
      buyers say they'd use their agent again — far fewer actually do, and the
      gap is here.
    </p>

    <div
      v-for="p in people" :key="p._id"
      class="gf-row"
      style="display:block"
    >
      <div class="flex flex-wrap items-baseline gap-x-3">
        <p class="gf-body" style="font-weight:600">{{ p.name }}</p>
        <span class="gf-meta" :style="{ color: p.anniversary ? '#4C5741' : 'var(--ink-2)' }">
          {{ p.reason }}
        </span>
      </div>

      <p v-if="p.closedAddress" class="gf-label gf-muted" style="margin-top:2px">
        {{ p.closedAddress }}
      </p>

      <!-- The opener. This is the whole point of the feature. -->
      <p
        v-if="p.opener"
        class="gf-body"
        style="margin-top:8px;padding:10px 14px;background:#EFEAE0;border-left:2px solid #4C5741"
      >
        {{ p.opener }}
      </p>
      <p v-else class="gf-meta gf-muted" style="margin-top:8px;font-style:italic">
        You haven't recorded anything about them — say something next time you
        run into them and it'll be here.
      </p>

      <div class="gf-row-actions" style="margin-top:10px">
        <a v-if="p.phone" :href="`tel:${p.phone}`" class="h-btn h-btn-go gf-tap">Call</a>
        <a v-if="p.email" :href="`mailto:${p.email}`" class="h-btn h-btn-quiet gf-tap">Email</a>
        <button
          class="h-btn h-btn-quiet gf-tap"
          :disabled="busy === p._id"
          @click="touched(p)"
        >
          {{ busy === p._id ? 'Saving…' : 'Spoke to them' }}
        </button>
      </div>
    </div>
  </section>
</template>
