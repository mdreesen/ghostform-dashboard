<script setup lang="ts">
import { localDate, toDateInput } from '~/utils/priority'
/**
 * Voice capture with confirmation.
 *
 * Flow: speak → see the transcript → send → see what the AI understood →
 * confirm or correct. The confirmation step is the whole point. This is a
 * transcription of a transcription, so a misheard day means a missed call —
 * the realtor has to see what we heard before anything becomes live.
 */
const props = defineProps<{ homeId?: string; leadId?: string }>()

const toast = useToast()
const open = ref(false)
const sending = ref(false)
const result = ref<any>(null)
const editing = ref<string | null>(null)
const editDate = ref('')

const { supported, listening, transcript, displayText, error: voiceError, toggle, stop, reset } = useVoiceInput()

const text = ref('')
watch(displayText, (t) => { if (listening.value && t) text.value = t })

function openPanel() {
  open.value = true
  result.value = null
  text.value = ''
  reset()
}

function closePanel() {
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
      body: { transcript: t, homeId: props.homeId, leadId: props.leadId }
    })
    await refreshNuxtData('reminders')
  } catch (err: any) {
    toast.error(err?.data?.message || 'Could not save that note.')
  } finally {
    sending.value = false
  }
}

/** Ask the question the note contained, against real data. */
const answer = ref('')
const answering = ref(false)
async function answerQuestion() {
  answering.value = true
  try {
    const res = await $fetch<any>('/api/documents/ask', {
      method: 'POST',
      body: { question: result.value.question, homeId: props.homeId, leadId: props.leadId }
    })
    answer.value = res.answer
  } catch {
    answer.value = 'Could not check that just now.'
  } finally {
    answering.value = false
  }
}
watch(result, (r) => { if (r?.question) answerQuestion() })

async function actOnReminder(r: any, action: string, extra: Record<string, any> = {}) {
  try {
    await $fetch(`/api/reminders/${r._id}`, { method: 'POST', body: { action, ...extra } })
    r.confirmed = action === 'confirm' || Boolean(extra.dueAt)
    if (action === 'dismiss') r.dismissed = true
    editing.value = null
    await refreshNuxtData('reminders')
  } catch {
    toast.error('Could not update that reminder.')
  }
}

function beginEdit(r: any) {
  editing.value = r._id
  editDate.value = toDateInput(r.dueAt)
}

const liveReminders = computed(() => (result.value?.reminders ?? []).filter((r: any) => !r.dismissed))

const INTENT_LABEL: Record<string, string> = {
  note: 'Saved as a note',
  question: 'Read as a question',
  reminder: 'Set as a reminder',
  mixed: 'Saved, with a reminder',
  unclear: "Wasn't sure what you meant — kept as a note"
}
</script>

<template>
  <div>
    <!-- Trigger -->
    <button
      v-if="!open"
      class="flex items-center gap-2 px-4 py-2.5 border border-[#DDD6C9] gf-label uppercase tracking-[0.1em] font-semibold text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"
      @click="openPanel"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </svg>
      Voice note
    </button>

    <!-- Panel -->
    <div v-else class="border border-[#DDD6C9] p-4 sm:p-5">
      <div class="flex items-baseline justify-between gap-4 mb-4">
        <p class="h-label">Voice note</p>
        <button class="gf-meta text-[#A9A39A] hover:text-[#1F1B16]" @click="closePanel">Close</button>
      </div>

      <!-- 1 · Speak -->
      <template v-if="!result">
        <div class="flex items-start gap-3 mb-3">
          <button
            v-if="supported"
            class="shrink-0 w-11 h-11 flex items-center justify-center border transition-colors"
            :class="listening ? 'bg-[#4C5741] border-[#4C5741] text-[#F7F4EF]' : 'border-[#DDD6C9] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16]'"
            @click="toggle"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" :fill="listening ? 'currentColor' : 'none'"
                 stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" />
            </svg>
          </button>
          <textarea
            v-model="text"
            rows="3"
            class="flex-1 bg-[#F7F4EF] border px-3.5 py-2.5 gf-body resize-none focus:outline-none transition-colors"
            :class="listening ? 'border-[#4C5741]' : 'border-[#DDD6C9] focus:border-[#4C5741]'"
            :placeholder="supported ? 'Tap the mic, or type it' : 'Type your note'"
          />
        </div>

        <p v-if="listening" class="gf-label mb-3" style="color:#4C5741">
          Listening — say what you need, then tap the mic again.
        </p>
        <p v-else-if="voiceError" class="gf-label mb-3" style="color:#4C5741">{{ voiceError }}</p>
        <p v-else class="gf-label gf-muted mb-3">
          Notes, questions and reminders all work. "Remind me to call the Chens Thursday."
        </p>

        <button
          class="px-5 py-2.5 bg-[#1F1B16] text-[#F7F4EF] gf-label uppercase tracking-[0.1em] font-semibold hover:opacity-[0.86] disabled:opacity-40"
          :disabled="sending || text.trim().length < 2"
          @click="send"
        >
          {{ sending ? 'Working…' : 'Save' }}
        </button>
      </template>

      <!-- 2 · What we understood -->
      <template v-else>
        <p class="gf-meta mb-1">{{ INTENT_LABEL[result.intent] || 'Saved' }}</p>
        <p v-if="result.degraded" class="gf-label mb-3" style="color:#4C5741">
          We saved what you said but couldn't work out what to do with it.
        </p>

        <div v-if="result.note" class="p-3.5 bg-[#EFEAE0] mb-4">
          <p class="gf-body leading-relaxed">{{ result.note }}</p>
        </div>

        <!-- Answer, if it was a question -->
        <div v-if="result.question" class="mb-4">
          <p class="gf-label gf-muted mb-1.5">You asked: "{{ result.question }}"</p>
          <div class="p-3.5 border-l-2 border-[#4C5741] bg-[#E9EDE3]">
            <p v-if="answering" class="gf-body text-[#8A847C]">Checking your documents…</p>
            <p v-else class="gf-body leading-relaxed">{{ answer }}</p>
          </div>
        </div>

        <!-- Reminders — unconfirmed until checked -->
        <div v-if="liveReminders.length" class="mb-4">
          <p class="gf-label gf-muted mb-2">
            {{ liveReminders.length === 1 ? 'Reminder' : 'Reminders' }} — check the day before confirming
          </p>
          <div
            v-for="r in liveReminders" :key="r._id"
            class="p-3.5 border-l-2 mb-2"
            :style="{ borderLeftColor: r.confirmed ? '#5A6349' : '#C08A2E', background: '#EFEAE0' }"
          >
            <p class="gf-body">{{ r.text }}</p>
            <p class="gf-meta mt-0.5">
              {{ localDate(r.dueAt).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) }}
            </p>
            <!-- The exact words, so they can check we heard the day right -->
            <p v-if="r.heardAs" class="gf-label gf-muted italic mt-1.5">
              heard: "{{ r.heardAs }}"
            </p>

            <div v-if="editing === r._id" class="flex flex-wrap items-center gap-2 mt-2.5">
              <input v-model="editDate" type="date"
                class="bg-[#F7F4EF] border border-[#DDD6C9] px-2.5 py-1.5 gf-meta focus:outline-none focus:border-[#4C5741]" />
              <button class="gf-meta font-semibold text-[#4C5741]" @click="actOnReminder(r, 'confirm', { dueAt: editDate })">Save</button>
              <button class="gf-meta text-[#8A847C]" @click="editing = null">Cancel</button>
            </div>
            <div v-else-if="!r.confirmed" class="flex flex-wrap items-center gap-3 mt-2.5">
              <button
                class="gf-label uppercase tracking-[0.08em] font-semibold px-3 py-1.5 bg-[#1F1B16] text-[#F7F4EF]"
                @click="actOnReminder(r, 'confirm')"
              >
                That's right
              </button>
              <button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]" @click="beginEdit(r)">Wrong day</button>
              <button class="gf-meta text-[#8A847C] hover:text-[#1F1B16]" @click="actOnReminder(r, 'dismiss')">Not a reminder</button>
            </div>
            <p v-else class="gf-label mt-2" style="color:#5A6349">Confirmed — it'll be in your briefing</p>
          </div>
        </div>

        <div class="gf-row-actions">
          <button
            class="px-5 py-2.5 bg-[#1F1B16] text-[#F7F4EF] gf-label uppercase tracking-[0.1em] font-semibold hover:opacity-[0.86]"
            @click="openPanel"
          >
            Add another
          </button>
          <button class="px-5 py-2.5 border border-[#DDD6C9] gf-label uppercase tracking-[0.1em] font-semibold text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16]" @click="closePanel">
            Done
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
