<script setup lang="ts">
/**
 * Where this person is, and what to do next.
 *
 * The label alone would be a status badge — decoration. The NEXT ACTION is the
 * useful half: a realtor opening a lead should not have to work out what stage
 * means what.
 */
import { STAGES, findStage, inferStage } from '~/utils/stages'

const props = defineProps<{ lead: any }>()
const emit = defineEmits<{ changed: [] }>()

const toast = useToast()
const busy = ref(false)

const current = computed(() => findStage(inferStage(props.lead)))
const options = computed(() =>
  (current.value?.advance ?? []).map((v) => findStage(v)).filter(Boolean) as any[]
)

async function move(stage: string) {
  busy.value = true
  try {
    await $fetch(`/api/leads/${props.lead._id}/stage`, { method: 'POST', body: { stage } })
    emit('changed')
  } catch (err: any) {
    toast.error(err?.data?.message || 'Could not move that.')
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <div v-if="current" class="h-inset" style="padding:var(--s2)">
    <div class="flex flex-wrap items-baseline gap-x-3">
      <span
        class="gf-label uppercase"
        style="letter-spacing:.12em;font-weight:600"
        :style="{ color: current.colour }"
      >
        {{ current.label }}
      </span>
      <span class="gf-body">{{ current.next }}</span>
    </div>

    <div v-if="options.length" class="gf-row-actions" style="margin-top:12px">
      <button
        v-for="o in options" :key="o.value"
        class="h-btn h-btn-quiet gf-tap"
        :disabled="busy"
        @click="move(o.value)"
      >
        {{ o.value === 'lost' ? "Didn't happen" : `Move to ${o.label.toLowerCase()}` }}
      </button>
    </div>
  </div>
</template>
