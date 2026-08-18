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
      class="text-[11px] uppercase tracking-[0.1em] px-4 py-2.5 border border-[#DDD6C9] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors whitespace-nowrap"
      @click="openComposer"
    >
      Draft
    </button>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div class="absolute inset-0 bg-[#1F1B16]/40 backdrop-blur-sm" @click="open = false" />

          <div
            class="relative w-full max-w-lg bg-[#F7F4EF] border border-[#DDD6C9] p-7 shadow-xl"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="gf-eyebrow">
                  AI Message
                </p>
                <h2 class="font-display text-[22px] font-semibold tracking-tight">
                  Message {{ leadName || 'lead' }}
                </h2>
              </div>
              <button class="text-[#A9A39A] hover:text-[#1F1B16] text-xl leading-none" @click="open = false">
                &times;
              </button>
            </div>

            <!-- Tone toggle -->
            <div class="flex gap-2 mb-3">
              <button
                v-for="opt in (['sms', 'email'] as const)"
                :key="opt"
                class="text-[11px] uppercase tracking-[0.1em] px-3.5 py-2 border transition-colors"
                :class="channel === opt ? 'bg-[#B5563A]/10 border-[#B5563A] text-[#B5563A]' : 'bg-transparent border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]'"
                @click="channel = opt"
              >
                {{ opt === 'sms' ? 'Text style' : 'Email style' }}
              </button>

              <button
                class="ml-auto text-[11px] uppercase tracking-[0.1em] px-3.5 py-2 border border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16] hover:border-[#1F1B16] transition-colors disabled:opacity-40"
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
              class="w-full bg-white/60 border border-[#DDD6C9] px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-[#B5563A]"
            />

            <!-- Editable draft -->
            <textarea
              v-model="message"
              :rows="channel === 'sms' ? 4 : 8"
              :placeholder="generating ? 'Writing a draft…' : 'Your message'"
              class="w-full bg-white/60 border border-[#DDD6C9] px-4 py-3.5 text-sm resize-none focus:outline-none focus:border-[#B5563A] leading-relaxed"
            />

            <p v-if="source" class="text-[11px] text-[#A9A39A] mt-2.5">
              {{ source === 'ai' ? 'AI-drafted from this lead’s details — edit before sending.' : 'Template draft — edit before sending.' }}
            </p>

            <div class="flex gap-3 mt-5">
              <button
                class="flex-1 py-3.5 border border-[#DDD6C9] text-[11px] uppercase tracking-[0.1em] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"
                @click="open = false"
              >
                Cancel
              </button>
              <button
                class="flex-1 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] hover:bg-[#9d4830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
