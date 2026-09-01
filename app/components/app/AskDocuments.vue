<script setup lang="ts">
/**
 * Ask a question about this property's documents, by typing or by voice.
 *
 * Voice matters here specifically because the moment a realtor wants this is
 * in the car — "when's the inspection deadline on Whitefish Stage?" — which is
 * exactly when typing is worst.
 */
const props = defineProps<{ homeId?: string; leadId?: string }>()

const question = ref('')
const answer = ref('')
const asking = ref(false)
const error = ref('')

const { supported, listening, displayText, error: voiceError, toggle, reset } = useVoiceInput()

let base = ''
watch(listening, (on) => { if (on) { base = question.value; reset() } })
watch(displayText, (t) => {
  if (listening.value && t) question.value = [base, t].filter(Boolean).join(' ').trim()
})

const EXAMPLES = [
  "When's the inspection deadline?",
  'What still needs doing this week?',
  'Has the earnest money been paid?'
]

async function ask() {
  const q = question.value.trim()
  if (q.length < 3) return

  asking.value = true
  error.value = ''
  answer.value = ''
  if (listening.value) toggle()

  try {
    const res = await $fetch<any>('/api/documents/ask', {
      method: 'POST',
      body: { question: q, homeId: props.homeId, leadId: props.leadId }
    })
    answer.value = res.answer
  } catch (err: any) {
    error.value = err?.data?.message || 'Could not answer that just now.'
  } finally {
    asking.value = false
  }
}
</script>

<template>
  <div>
    <div class="flex items-baseline justify-between gap-3 mb-2">
      <p class="gf-eyebrow">Ask about these documents</p>
      <button
        v-if="supported"
        type="button"
        class="flex items-center gap-1.5 gf-label transition-colors"
        :class="listening ? 'text-[#B5563A]' : 'text-[#A9A39A] hover:text-[#1F1B16]'"
        @click="toggle"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" :fill="listening ? 'currentColor' : 'none'"
             stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" />
        </svg>
        {{ listening ? 'Listening' : 'Speak' }}
      </button>
    </div>

    <div class="flex gap-2">
      <input
        v-model="question"
        class="flex-1 bg-[#F7F4EF] border px-3.5 py-2.5 gf-body focus:outline-none transition-colors"
        :class="listening ? 'border-[#B5563A]' : 'border-[#DDD6C9] focus:border-[#B5563A]'"
        placeholder="When's the inspection deadline?"
        @keyup.enter="ask"
      />
      <button
        class="px-5 py-2.5 bg-[#B5563A] text-[#F7F4EF] gf-label uppercase tracking-[0.1em] font-semibold hover:bg-[#9d4830] transition-colors disabled:opacity-40 whitespace-nowrap"
        :disabled="asking || question.trim().length < 3"
        @click="ask"
      >
        {{ asking ? 'Checking…' : 'Ask' }}
      </button>
    </div>

    <p v-if="voiceError" class="gf-label text-[#B5563A] mt-1.5">{{ voiceError }}</p>

    <!-- Suggestions, because a blank field is where people stop -->
    <div v-if="!answer && !asking" class="flex flex-wrap gap-1.5 mt-2.5">
      <button
        v-for="ex in EXAMPLES" :key="ex"
        class="gf-label gf-muted border border-[#DDD6C9] px-2.5 py-1 hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"
        @click="question = ex; ask()"
      >
        {{ ex }}
      </button>
    </div>

    <div v-if="answer" class="mt-4 p-4 bg-[#EFEAE0] border-l-2 border-[#B5563A]">
      <p class="gf-body leading-relaxed">{{ answer }}</p>
      <p class="gf-label gf-muted mt-2.5">
        From what's been extracted and confirmed — open the document to check anything critical.
      </p>
    </div>

    <p v-if="error" class="gf-meta text-[#B5563A] mt-3">{{ error }}</p>
  </div>
</template>
