<script setup lang="ts">
/**
 * AI message composer for a single lead.
 *
 * Two ways out:
 *  - **Text**: builds an `sms:` deep link that opens the realtor's own Messages
 *    app with the draft prefilled. No SMS provider, no 10DLC registration, and
 *    the text comes from the realtor's real number — which is better for both
 *    deliverability and compliance than application-to-person traffic.
 *  - **Email**: sends server-side through Resend as before.
 *
 * Either path stamps contact so the lead drops off the daily briefing.
 * Emits 'sent' so the parent can remove it from a list.
 */
const props = defineProps<{
  leadId: string
  leadName?: string
  leadPhone?: string
}>()

const emit = defineEmits<{ sent: [string] }>()

const open = ref(false)
const channel = ref<'sms' | 'email'>('sms')
const message = ref('')
const subject = ref('Following up on your property search')
const source = ref<'ai' | 'template' | null>(null)
const generating = ref(false)
const sending = ref(false)
const copied = ref(false)
const toast = useToast()

/** Digits only, so formatting like (406) 555-1234 still dials correctly. */
const cleanPhone = computed(() => (props.leadPhone || '').replace(/[^\d+]/g, ''))
const hasPhone = computed(() => cleanPhone.value.length >= 7)

/**
 * iOS and Android disagree on SMS URI syntax for a prefilled body:
 *   iOS     -> sms:+15551234567&body=...
 *   Android -> sms:+15551234567?body=...
 * Using the wrong separator means the body is silently dropped, so we detect.
 */
const smsHref = computed(() => {
  if (!hasPhone.value) return ''
  const body = encodeURIComponent(message.value || '')
  const ua = import.meta.client ? navigator.userAgent : ''
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes('Mac') && import.meta.client && 'ontouchend' in document)
  const sep = isIOS ? '&' : '?'
  return `sms:${cleanPhone.value}${sep}body=${body}`
})

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

async function openComposer() {
  open.value = true
  // If there's no phone on file, texting isn't an option — start on email.
  if (!hasPhone.value) channel.value = 'email'
  if (!message.value) await generate()
}

watch(channel, () => { if (open.value) generate() })

/** Shared cleanup after either send path succeeds. */
async function afterSend(label: string) {
  toast.success(label)

  // Close and file the lead away FIRST. A refresh failing must not stop the
  // UI from reflecting a send that already happened — previously a thrown
  // refresh skipped the emit entirely and the row stayed on the list.
  emit('sent', props.leadId)
  open.value = false
  message.value = ''
  source.value = null

  try {
    await Promise.all([refreshNuxtData('leads'), refreshNuxtData('briefing')])
  } catch (err) {
    console.error('[composer] refresh after send failed (message was sent):', err)
  }
}

async function openMessages() {
  if (!hasPhone.value || !message.value.trim()) return
  sending.value = true
  try {
    window.location.href = smsHref.value
    // await $fetch(`/api/leads/${props.leadId}/contacted`, { method: 'POST' })
    await afterSend(`Opened Messages for ${props.leadName || 'lead'}`)
  } catch {
    toast.error('Could not record the contact. The message app should still open.')
  } finally {
    sending.value = false
  }
}

/** Email path: server-side send via Resend. */
async function sendEmail() {
  if (!message.value.trim()) return
  sending.value = true
  try {
    await $fetch(`/api/leads/${props.leadId}/send-message`, {
      method: 'POST',
      body: { message: message.value, subject: subject.value }
    })
    await afterSend(`Message sent to ${props.leadName || 'lead'}`)
  } catch (e: any) {
    toast.error(e?.data?.message || 'Could not send. Please try again.')
  } finally {
    sending.value = false
  }
}

/** Desktop fallback — sms: links don't reliably work off a phone. */
async function copyMessage() {
  try {
    await navigator.clipboard.writeText(message.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    toast.error('Could not copy.')
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

          <div class="relative w-full max-w-lg bg-[#F7F4EF] border border-[#DDD6C9] p-7 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="gf-eyebrow">AI Message</p>
                <h2 class="font-display text-[22px] font-semibold tracking-tight">
                  Message {{ leadName || 'lead' }}
                </h2>
              </div>
              <button class="text-[#A9A39A] hover:text-[#1F1B16] text-xl leading-none" @click="open = false">
                &times;
              </button>
            </div>

            <!-- Channel toggle -->
            <div class="flex gap-2 mb-3">
              <button
                class="text-[11px] uppercase tracking-[0.1em] px-3.5 py-2 border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                :class="channel === 'sms' ? 'bg-[#B5563A]/10 border-[#B5563A] text-[#B5563A]' : 'bg-transparent border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]'"
                :disabled="!hasPhone"
                :title="hasPhone ? '' : 'No phone number on file for this lead'"
                @click="channel = 'sms'"
              >
                Text
              </button>
              <button
                class="text-[11px] uppercase tracking-[0.1em] px-3.5 py-2 border transition-colors"
                :class="channel === 'email' ? 'bg-[#B5563A]/10 border-[#B5563A] text-[#B5563A]' : 'bg-transparent border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16]'"
                @click="channel = 'email'"
              >
                Email
              </button>

              <button
                class="ml-auto text-[11px] uppercase tracking-[0.1em] px-3.5 py-2 border border-[#DDD6C9] text-[#8A847C] hover:text-[#1F1B16] hover:border-[#1F1B16] transition-colors disabled:opacity-40"
                :disabled="generating"
                @click="generate"
              >
                {{ generating ? 'Generating…' : '↻ Regenerate' }}
              </button>
            </div>

            <!-- Subject (email only) -->
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

            <div class="flex items-baseline justify-between gap-4 mt-2.5">
              <p v-if="source" class="text-[11px] text-[#A9A39A]">
                {{ source === 'ai'
                  ? 'AI-drafted from this lead’s details — edit before sending.'
                  : 'Template draft — edit before sending.' }}
              </p>
              <button
                class="text-[11px] uppercase tracking-[0.1em] text-[#8A847C] hover:text-[#B5563A] transition-colors shrink-0"
                @click="copyMessage"
              >
                {{ copied ? 'Copied' : 'Copy' }}
              </button>
            </div>

            <!-- Channel-specific note -->
            <p v-if="channel === 'sms'" class="text-[11px] text-[#A9A39A] mt-2 leading-relaxed">
              Opens your phone’s Messages app with this text ready to send to
              <span class="text-[#8A847C]">{{ leadPhone }}</span>. It sends from your
              own number — on desktop, use Copy instead.
            </p>

            <div class="flex gap-3 mt-5">
              <button
                class="flex-1 py-3.5 border border-[#DDD6C9] text-[11px] uppercase tracking-[0.1em] text-[#8A847C] hover:border-[#1F1B16] hover:text-[#1F1B16] transition-colors"
                @click="open = false"
              >
                Cancel
              </button>

              <button
                v-if="channel === 'sms'"
                class="flex-1 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] hover:bg-[#9d4830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="sending || generating || !message.trim() || !hasPhone"
                @click="openMessages"
              >
                {{ sending ? 'Opening…' : 'Open in Messages' }}
              </button>

              <button
                v-else
                class="flex-1 py-3.5 bg-[#B5563A] text-[#F7F4EF] text-[11px] uppercase tracking-[0.1em] hover:bg-[#9d4830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="sending || generating || !message.trim()"
                @click="sendEmail"
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
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
