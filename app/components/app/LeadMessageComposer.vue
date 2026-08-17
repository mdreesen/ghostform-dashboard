<script setup lang="ts">
/**
 * AI message composer for a single lead.
 * - Generates a personalized draft (SMS-style by default) grounded in the
 *   lead's real data.
 * - Lets the realtor edit it, switch between text/email tone, regenerate.
 * - One-tap send via email; on send we stamp contact so the lead drops off
 *   the briefing.
 *
 * Emits 'sent' so the parent can optimistically remove the lead from a list.
 */
const props = defineProps<{
  leadId: string
  leadName?: string
}>()

const emit = defineEmits<{ sent: [string] }>()

const open = ref(false)
const channel = ref<'sms' | 'email'>('sms')
const message = ref('')
const subject = ref('Following up on your property search')
const source = ref<'ai' | 'template' | null>(null)
const generating = ref(false)
const sending = ref(false)
const toast = useToast()

async function generate() {
  generating.value = true
  try {
    const res = await $fetch<{ message: string; source: 'ai' | 'template'; channel: string }>(
      `/api/leads/${props.leadId}/draft`,
      { method: 'POST', body: { channel: channel.value } }
    )
    message.value = res.message
    source.value = res.source
  } catch {
    toast.error('Could not generate a draft. Please try again.')
  } finally {
    generating.value = false
  }
}

// Open the composer and generate the first draft immediately.
async function openComposer() {
  open.value = true
  if (!message.value) await generate()
}

// Regenerate when the realtor switches tone.
watch(channel, () => {
  if (open.value) generate()
})

async function send() {
  if (!message.value.trim()) return
  sending.value = true
  try {
    await $fetch(`/api/leads/${props.leadId}/send-message`, {
      method: 'POST',
      body: { message: message.value, subject: subject.value }
    })
    toast.success(`Message sent to ${props.leadName || 'lead'}`)
    await Promise.all([refreshNuxtData('leads'), refreshNuxtData('briefing')])
    emit('sent', props.leadId)
    open.value = false
    message.value = ''
    source.value = null
  } catch (e: any) {
    toast.error(e?.data?.message || 'Could not send. Please try again.')
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="inline-block">
    <button
      class="text-[11px] font-bold px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors whitespace-nowrap"
      @click="openComposer"
    >
      ✍️ Draft
    </button>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-zinc-950/90 backdrop-blur-md" @click="open = false" />

          <div
            class="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-purple-400">
                  AI Message
                </p>
                <h2 class="text-lg font-bold tracking-tight">
                  Message {{ leadName || 'lead' }}
                </h2>
              </div>
              <button class="text-zinc-500 hover:text-white text-xl" @click="open = false">
                &times;
              </button>
            </div>

            <!-- Tone toggle -->
            <div class="flex gap-2 mb-3">
              <button
                v-for="opt in (['sms', 'email'] as const)"
                :key="opt"
                class="text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-colors"
                :class="channel === opt
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-200'
                  : 'bg-white/2 border-white/10 text-zinc-400 hover:text-white'"
                @click="channel = opt"
              >
                {{ opt === 'sms' ? 'Text style' : 'Email style' }}
              </button>

              <button
                class="ml-auto text-[11px] font-bold px-3 py-1.5 rounded-lg bg-white/2 border border-white/10 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                :disabled="generating"
                @click="generate"
              >
                {{ generating ? 'Generating…' : '↻ Regenerate' }}
              </button>
            </div>

            <!-- Optional subject (email only) -->
            <input
              v-if="channel === 'email'"
              v-model="subject"
              placeholder="Subject"
              class="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-purple-400"
            />

            <!-- Editable draft -->
            <textarea
              v-model="message"
              :rows="channel === 'sms' ? 4 : 8"
              :placeholder="generating ? 'Writing a draft…' : 'Your message'"
              class="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-purple-400 leading-relaxed"
            />

            <p v-if="source" class="text-[10px] text-zinc-600 mt-2">
              {{ source === 'ai' ? 'AI-drafted from this lead’s details — edit before sending.' : 'Template draft — edit before sending.' }}
            </p>

            <div class="flex gap-3 mt-5">
              <button
                class="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-colors"
                @click="open = false"
              >
                Cancel
              </button>
              <button
                class="flex-1 py-3 rounded-xl bg-purple-500 text-white text-sm font-bold hover:bg-purple-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="sending || generating || !message.trim()"
                @click="send"
              >
                {{ sending ? 'Sending…' : 'Send email' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
