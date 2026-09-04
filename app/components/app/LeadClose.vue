<script setup lang="ts">
/**
 * Closing a deal, and keeping the person afterwards.
 *
 * This is the moment a lead becomes worth more than any new lead — 82% of an
 * experienced agent's business is repeat and referral — and it's the moment
 * every CRM treats as an ending. So this asks for the two things that make the
 * relationship workable later: the anniversary date and something true about
 * them.
 */
import { toDateInput, localDate } from '~/utils/priority'

const props = defineProps<{ lead: any }>()
const emit = defineEmits<{ changed: [] }>()

const toast = useToast()
const open = ref(false)
const saving = ref(false)
const noteText = ref('')
const addingNote = ref(false)

const isClosed = computed(() => Boolean(props.lead?.closedAt))
const notes = computed(() => props.lead?.sphereNotes ?? [])

const form = reactive({
  closedAt: toDateInput(new Date()),
  closedAddress: props.lead?.address ?? '',
  touchEveryMonths: 4
})

watch(() => props.lead, (l) => {
  if (l?.closedAt) form.closedAt = toDateInput(l.closedAt)
  if (l?.closedAddress) form.closedAddress = l.closedAddress
  if (l?.touchEveryMonths) form.touchEveryMonths = l.touchEveryMonths
}, { immediate: true })

async function save() {
  saving.value = true
  try {
    await $fetch(`/api/leads/${props.lead._id}/close`, { method: 'POST', body: { ...form } })
    open.value = false
    emit('changed')
    toast.add({ title: 'Marked closed. They\'ll appear under people worth calling.' })
  } catch (err: any) {
    toast.add({ title: err?.data?.message || 'Could not save that.', color: 'error', duration: 8000 })
  } finally { saving.value = false }
}

async function reopen() {
  saving.value = true
  try {
    await $fetch(`/api/leads/${props.lead._id}/close`, { method: 'POST', body: { reopen: true } })
    emit('changed')
  } catch { toast.add({ title: 'Could not reopen.', color: 'error', duration: 8000 }) }
  finally { saving.value = false }
}

async function addNote() {
  const t = noteText.value.trim()
  if (t.length < 2) return
  addingNote.value = true
  try {
    await $fetch(`/api/leads/${props.lead._id}/sphere-note`, { method: 'POST', body: { text: t } })
    noteText.value = ''
    emit('changed')
  } catch { toast.add({ title: 'Could not save that.', color: 'error', duration: 8000 }) }
  finally { addingNote.value = false }
}

async function removeNote(capturedAt: string) {
  try {
    await $fetch(`/api/leads/${props.lead._id}/sphere-note`, { method: 'POST', body: { removeAt: capturedAt } })
    emit('changed')
  } catch { toast.add({ title: 'Could not remove that.', color: 'error', duration: 8000 }) }
}
</script>

<template>
  <section class="gf-section">
    <p class="h-label" style="margin-bottom:6px">After the sale</p>

    <!-- Not closed yet -->
    <template v-if="!isClosed">
      <p class="gf-meta gf-measure-tight" style="margin-bottom:var(--s2)">
        When this closes, mark it here. Past clients are where most repeat
        business comes from, and the anniversary gives you a reason to call.
      </p>

      <button v-if="!open" class="h-btn h-btn-go gf-tap" @click="open = true">
        Mark as closed
      </button>

      <div v-else class="h-inset" style="padding:var(--s2)">
        <div class="gf-field-row" style="border:0;padding-block:0 var(--s2)">
          <label class="gf-meta" for="cd">Closing date</label>
          <input id="cd" v-model="form.closedAt" type="date" class="h-input" />
        </div>
        <div class="gf-field-row" style="border:0;padding-block:0 var(--s2)">
          <label class="gf-meta" for="ca">Address</label>
          <input id="ca" v-model="form.closedAddress" class="h-input" placeholder="348 Whitefish Stage Road" />
        </div>
        <div class="gf-field-row" style="border:0;padding-block:0 var(--s2)">
          <label class="gf-meta" for="cm">Hear from you every</label>
          <select id="cm" v-model.number="form.touchEveryMonths" class="h-input">
            <option :value="3">3 months</option>
            <option :value="4">4 months</option>
            <option :value="6">6 months</option>
            <option :value="12">12 months</option>
          </select>
        </div>
        <div class="gf-row-actions">
          <button class="h-btn gf-tap" :disabled="saving" @click="save">
            {{ saving ? 'Saving…' : 'Save' }}
          </button>
          <button class="h-btn h-btn-quiet gf-tap" @click="open = false">Cancel</button>
        </div>
      </div>
    </template>

    <!-- Closed -->
    <template v-else>
      <p class="gf-body" style="margin-bottom:2px">
        Closed {{ localDate(lead.closedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) }}
      </p>
      <p v-if="lead.closedAddress" class="gf-meta">{{ lead.closedAddress }}</p>

      <div style="margin-top:var(--s3)">
        <p class="gf-meta" style="margin-bottom:6px">What you know about them</p>
        <p class="gf-label gf-muted gf-measure-tight" style="margin-bottom:10px">
          The thing you'd open a call with. Speaking it into a voice note is
          faster, but you can type it here.
        </p>

        <div v-for="n in notes" :key="n.capturedAt" class="gf-row" style="padding-block:10px">
          <p class="gf-body" style="flex:1">{{ n.text }}</p>
          <button class="gf-meta gf-muted" @click="removeNote(n.capturedAt)">Remove</button>
        </div>

        <div class="flex flex-col sm:flex-row gap-2" style="margin-top:10px">
          <input
            v-model="noteText" class="h-input"
            placeholder="Second kid on the way, outgrowing the place"
            @keyup.enter="addNote"
          />
          <button class="h-btn h-btn-quiet gf-tap" :disabled="addingNote || noteText.trim().length < 2" @click="addNote">
            {{ addingNote ? 'Adding…' : 'Add' }}
          </button>
        </div>
      </div>

      <button class="gf-meta gf-muted" style="margin-top:var(--s2)" :disabled="saving" @click="reopen">
        Not actually closed — reopen
      </button>
    </template>
  </section>
</template>
