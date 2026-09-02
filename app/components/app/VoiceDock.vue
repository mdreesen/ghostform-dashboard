<script setup lang="ts">
import { localDate, toDateInput } from '~/utils/priority'
/**
 * PERSISTENT VOICE INPUT
 *
 * Voice is the primary way a realtor puts information in — they're in a car
 * between showings, not at a desk. So it can't live inside one page's content
 * where you have to navigate and scroll to reach it.
 *
 * Mobile: a fixed button in the bottom-right thumb zone. That corner is where
 * a thumb naturally rests on a phone held one-handed, which is how someone
 * uses this in a truck.
 *
 * Desktop: bottom-right too, plus Cmd/Ctrl+K, since hands are already on keys.
 *
 * It opens a sheet rather than expanding inline — the panel needs room, and
 * pushing page content around while someone is mid-thought is disorienting.
 */
const route = useRoute()
const toast = useToast()

const open = ref(false)
const sending = ref(false)
const result = ref<any>(null)
const editing = ref<string | null>(null)
const editDate = ref('')

const { supported, listening, displayText, error: voiceError, toggle, stop, reset } = useVoiceInput()
const text = ref('')
watch(displayText, (t) => { if (listening.value && t) text.value = t })

/**
 * Attach the note to whatever the realtor is looking at.
 * Speaking on a property page should file against that property without them
 * having to say which one.
 */
const context = computed(() => {
  const p = route.path
  let homeId: string | undefined
  let leadId: string | undefined
  let label = ''
  const home = p.match(/\/dashboard\/home\/([^/]+)/)
  const lead = p.match(/\/dashboard\/leads\/([^/]+)/)
  if (home && home[1] !== 'create') { homeId = home[1]; label = 'this property' }
  else if (lead && !['create', 'import'].includes(lead[1] ?? '')) { leadId = lead[1]; label = 'this lead' }
  return { homeId, leadId, label }
})

function openDock() {
  open.value = true
  result.value = null
  text.value = ''
  reset()
  // Start listening straight away — the point is speed. Anyone who'd rather
  // type just taps the field.
  nextTick(() => { if (supported.value && !listening.value) toggle() })
}

function closeDock() {
  if (listening.value) stop()
  open.value = false
  result.value = null
  text.value = ''
}

async function send() {
  const t = text.value.trim()
  if (t.length < 2) return
  if (listening.value) stop()
  sending.value = true
  try {
    result.value = await $fetch('/api/voice/note', {
      method: 'POST',
      body: { transcript: t, homeId: context.value.homeId, leadId: context.value.leadId }
    })
    await refreshNuxtData('reminders')
  } catch (err: any) {
    toast.error(err?.data?.message || 'Could not save that note.')
  } finally {
    sending.value = false
  }
}

async function actOnReminder(r: any, action: string, extra: Record<string, any> = {}) {
  try {
    await $fetch(`/api/reminders/${r._id}`, { method: 'POST', body: { deadlineId: r._id, action, ...extra } })
    r.confirmed = action === 'confirm' || Boolean(extra.dueAt)
    if (action === 'dismiss') r.dismissed = true
    editing.value = null
    await refreshNuxtData('reminders')
  } catch {
    toast.error('Could not update that reminder.')
  }
}

const liveReminders = computed(() => (result.value?.reminders ?? []).filter((r: any) => !r.dismissed))

const INTENT_LABEL: Record<string, string> = {
  note: 'Saved as a note',
  question: 'Read as a question',
  reminder: 'Set as a reminder',
  mixed: 'Saved, with a reminder',
  unclear: "Wasn't sure what you meant — kept as a note"
}

// Cmd/Ctrl+K on desktop. Escape closes.
function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open.value ? closeDock() : openDock() }
  if (e.key === 'Escape' && open.value) closeDock()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div>
    <!-- Trigger. Fixed bottom-right — the thumb zone on a phone. -->
    <button
      v-if="!open"
      class="gf-dock"
      aria-label="Add a voice note"
      @click="openDock"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </svg>
      <span class="text-[12px] uppercase tracking-[0.12em] font-semibold">Speak</span>
    </button>

    <!-- Sheet -->
    <Teleport to="body">
      <div v-if="open" class="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center">
        <div class="absolute inset-0 bg-[#1F1B16]/25" @click="closeDock" />

        <div
          class="relative w-full sm:max-w-[560px] bg-[#F7F4EF] border-t sm:border border-[#DDD6C9] max-h-[88vh] overflow-y-auto"
          style="border-radius: 2px"
        >
          <div class="p-5 sm:p-6">
            <div class="flex items-baseline justify-between gap-4 mb-4">
              <p class="h-label">
                Voice note<template v-if="context.label"> · {{ context.label }}</template>
              </p>
              <button class="gf-meta text-[#A9A39A] hover:text-[#1F1B16]" @click="closeDock">Close</button>
            </div>

            <!-- Capture -->
            <template v-if="!result">
              <div class="flex items-start gap-3 mb-3">
                <button
                  v-if="supported"
                  class="shrink-0 w-12 h-12 flex items-center justify-center border transition-colors"
                  :class="listening ? 'bg-[#4C5741] border-[#4C5741] text-[#F7F4EF]' : 'border-[#DDD6C9] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16]'"
                  :aria-label="listening ? 'Stop listening' : 'Start listening'"
                  @click="toggle"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" :fill="listening ? 'currentColor' : 'none'"
                       stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" />
                  </svg>
                </button>
                <textarea
                  v-model="text" rows="4"
                  class="flex-1 bg-[#F7F4EF] border px-3.5 py-2.5 gf-body resize-none focus:outline-none transition-colors"
                  :class="listening ? 'border-[#4C5741]' : 'border-[#DDD6C9] focus:border-[#4C5741]'"
                  :placeholder="supported ? 'Speak, or type it here' : 'Type your note'"
                />
              </div>

              <p v-if="listening" class="gf-label mb-4" style="color:#4C5741">
                Listening — tap the mic when you're done.
              </p>
              <p v-else-if="voiceError" class="gf-label text-[#B5563A] mb-4">{{ voiceError }}</p>
              <p v-else class="gf-label gf-muted mb-4">
                Notes, questions and reminders all work.
              </p>

              <button
                class="w-full sm:w-auto bg-[#1F1B16] text-[#F7F4EF] px-6 text-[12px] uppercase tracking-[0.12em] font-semibold hover:opacity-90 disabled:opacity-40 gf-tap justify-center"
                :disabled="sending || text.trim().length < 2"
                @click="send"
              >
                {{ sending ? 'Working…' : 'Save' }}
              </button>
            </template>

            <!-- What we understood -->
            <template v-else>
              <p class="gf-meta mb-3">{{ INTENT_LABEL[result.intent] || 'Saved' }}</p>

              <div v-if="result.note" class="p-3.5 bg-[#EFEAE0] mb-4">
                <p class="gf-body leading-relaxed">{{ result.note }}</p>
              </div>

              <div v-if="liveReminders.length" class="mb-4">
                <p class="gf-label gf-muted mb-2">Check the day before confirming</p>
                <div
                  v-for="r in liveReminders" :key="r._id"
                  class="p-3.5 border-l-2 mb-2 bg-[#EFEAE0]"
                  :style="{ borderLeftColor: r.confirmed ? '#4C5741' : '#9A7B2E' }"
                >
                  <p class="gf-body">{{ r.text }}</p>
                  <p class="gf-meta mt-0.5">
                    {{ localDate(r.dueAt).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) }}
                  </p>
                  <p v-if="r.heardAs" class="gf-label gf-muted italic mt-1.5">heard: "{{ r.heardAs }}"</p>

                  <div v-if="editing === r._id" class="flex flex-wrap items-center gap-2 mt-2.5">
                    <input v-model="editDate" type="date" class="bg-[#F7F4EF] border border-[#DDD6C9] px-2.5 py-1.5 gf-meta focus:outline-none focus:border-[#4C5741]" />
                    <button class="gf-meta font-semibold text-[#4C5741]" @click="actOnReminder(r, 'confirm', { dueAt: editDate })">Save</button>
                    <button class="gf-meta text-[#8A847C]" @click="editing = null">Cancel</button>
                  </div>
                  <div v-else-if="!r.confirmed" class="gf-row-actions mt-2.5">
                    <button class="gf-label uppercase tracking-[0.08em] font-semibold px-3 py-1.5 bg-[#1F1B16] text-[#F7F4EF]" @click="actOnReminder(r, 'confirm')">That's right</button>
                    <button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]" @click="editing = r._id; editDate = toDateInput(r.dueAt)">Wrong day</button>
                    <button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]" @click="actOnReminder(r, 'dismiss')">Not a reminder</button>
                  </div>
                  <p v-else class="gf-label mt-2" style="color:#4C5741">Confirmed — it'll be in your briefing</p>
                </div>
              </div>

              <div class="gf-row-actions">
                <button class="bg-[#1F1B16] text-[#F7F4EF] px-6 text-[12px] uppercase tracking-[0.12em] font-semibold hover:opacity-90 gf-tap" @click="openDock">Add another</button>
                <button class="border border-[#DDD6C9] px-6 text-[12px] uppercase tracking-[0.12em] font-semibold text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] gf-tap" @click="closeDock">Done</button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
